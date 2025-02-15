import * as _ from 'lodash';
import { K8sStatus } from '@openshift/dynamic-plugin-sdk-utils';
import {
  isCpuLimitEqual,
  isCpuLimitLarger,
  isMemoryLimitEqual,
  isMemoryLimitLarger,
} from '~/utilities/valueUnits';
import {
  assembleSecretSA,
  createRoleBinding,
  createSecret,
  deleteSecret,
  generateRoleBindingServingRuntime,
  replaceSecret,
  assembleServiceAccount,
  createServiceAccount,
  getRoleBinding,
  addOwnerReference,
} from '~/api';
import {
  SecretKind,
  K8sAPIOptions,
  RoleBindingKind,
  ServingRuntimeKind,
  DataScienceClusterKindStatus,
  InferenceServiceKind,
} from '~/k8sTypes';
import { ContainerResources } from '~/types';
import { getDisplayNameFromK8sResource, translateDisplayNameForK8s } from '~/pages/projects/utils';
import {
  CreatingServingRuntimeObject,
  ServingRuntimeEditInfo,
  ServingRuntimeSize,
  ServingRuntimeToken,
} from '~/pages/modelServing/screens/types';
import { AcceleratorProfileState } from '~/utilities/useAcceleratorProfileState';
import { getAcceleratorProfileCount } from '~/utilities/utils';

type TokenNames = {
  serviceAccountName: string;
  roleBindingName: string;
};

export const getModelServingRuntimeName = (namespace: string): string =>
  `model-server-${namespace}`;

export const getModelServiceAccountName = (name: string): string => `${name}-sa`;

export const getModelRoleBinding = (name: string): string => `${name}-view`;

const isValidCpuOrMemoryValue = (value?: string | number) =>
  value === undefined ? true : parseInt(String(value)) > 0;

export const resourcesArePositive = (resources: ContainerResources): boolean =>
  isValidCpuOrMemoryValue(resources.limits?.cpu) &&
  isValidCpuOrMemoryValue(resources.limits?.memory) &&
  isValidCpuOrMemoryValue(resources.requests?.cpu) &&
  isValidCpuOrMemoryValue(resources.requests?.memory);

export const requestsUnderLimits = (resources: ContainerResources): boolean =>
  isCpuLimitLarger(resources.requests?.cpu, resources.limits?.cpu, true) &&
  isMemoryLimitLarger(resources.requests?.memory, resources.limits?.memory, true);

export const setUpTokenAuth = async (
  fillData: CreatingServingRuntimeObject,
  servingRuntimeName: string,
  namespace: string,
  createRolebinding: boolean,
  owner: ServingRuntimeKind,
  existingSecrets?: SecretKind[],
  opts?: K8sAPIOptions,
): Promise<void> => {
  const { serviceAccountName, roleBindingName } = getTokenNames(servingRuntimeName, namespace);

  const serviceAccount = addOwnerReference(
    assembleServiceAccount(serviceAccountName, namespace),
    owner,
  );
  const roleBinding = addOwnerReference(
    generateRoleBindingServingRuntime(roleBindingName, serviceAccountName, namespace),
    owner,
  );
  return Promise.all([
    ...(existingSecrets === undefined ? [createServiceAccount(serviceAccount, opts)] : []),
    ...(createRolebinding ? [createRoleBindingIfMissing(roleBinding, namespace, opts)] : []),
  ])
    .then(() => createSecrets(fillData, servingRuntimeName, namespace, existingSecrets, opts))
    .catch((error) => Promise.reject(error));
};

export const createRoleBindingIfMissing = async (
  rolebinding: RoleBindingKind,
  namespace: string,
  opts?: K8sAPIOptions,
): Promise<RoleBindingKind> =>
  getRoleBinding(namespace, rolebinding.metadata.name).catch((e) => {
    if (e.statusObject?.code === 404) {
      return createRoleBinding(rolebinding, opts);
    }
    return Promise.reject(e);
  });

export const createSecrets = async (
  fillData: CreatingServingRuntimeObject,
  servingRuntimeName: string,
  namespace: string,
  existingSecrets?: SecretKind[],
  opts?: K8sAPIOptions,
): Promise<void> => {
  const { serviceAccountName } = getTokenNames(servingRuntimeName, namespace);
  const deletedSecrets =
    existingSecrets
      ?.map((secret) => secret.metadata.name)
      .filter((token) => !fillData.tokens.some((tokenEdit) => tokenEdit.editName === token)) || [];

  return Promise.all<K8sStatus | SecretKind>([
    ...fillData.tokens
      .filter((token) => translateDisplayNameForK8s(token.name) !== token.editName)
      .map((token) => {
        const secretToken = assembleSecretSA(
          token.name,
          serviceAccountName,
          namespace,
          token.editName,
        );
        if (token.editName) {
          return replaceSecret(secretToken, opts);
        }
        return createSecret(secretToken, opts);
      }),
    ...deletedSecrets.map((secret) => deleteSecret(namespace, secret, opts)),
  ])
    .then(() => Promise.resolve())
    .catch((error) => Promise.reject(error));
};

export const getTokenNames = (servingRuntimeName: string, namespace: string): TokenNames => {
  const name =
    servingRuntimeName !== '' ? servingRuntimeName : getModelServingRuntimeName(namespace);

  const serviceAccountName = getModelServiceAccountName(name);
  const roleBindingName = getModelRoleBinding(name);

  return { serviceAccountName, roleBindingName };
};

export const getServingRuntimeSize = (
  sizes: ServingRuntimeSize[],
  servingRuntime?: ServingRuntimeKind,
): ServingRuntimeSize => {
  const existingResources = servingRuntime?.spec?.containers[0]?.resources || sizes[0].resources;
  const size = sizes.find(
    (size) =>
      isCpuLimitEqual(size.resources.limits?.cpu, existingResources.limits?.cpu) &&
      isMemoryLimitEqual(size.resources.limits?.memory, existingResources.limits?.memory),
  );
  return (
    size || {
      name: 'Custom',
      resources: existingResources,
    }
  );
};

export const getServingRuntimeTokens = (tokens?: SecretKind[]): ServingRuntimeToken[] =>
  (tokens || []).map((secret) => ({
    name: getDisplayNameFromK8sResource(secret) || secret.metadata.name,
    editName: secret.metadata.name,
    uuid: secret.metadata.name,
    error: '',
  }));

const isAcceleratorProfileChanged = (
  acceleratorProfileState: AcceleratorProfileState,
  servingRuntime: ServingRuntimeKind,
) => {
  const { acceleratorProfile } = acceleratorProfileState;
  const { initialAcceleratorProfile } = acceleratorProfileState;

  // both are none, check if it's using existing
  if (!acceleratorProfile && !initialAcceleratorProfile) {
    if (acceleratorProfileState.additionalOptions?.useExisting) {
      return !acceleratorProfileState.useExisting;
    }
    return false;
  }

  // one is none, another is set, changed
  if (!acceleratorProfile || !initialAcceleratorProfile) {
    return true;
  }

  // compare the name, gpu count
  return (
    acceleratorProfile.metadata.name !== initialAcceleratorProfile.metadata.name ||
    acceleratorProfileState.count !==
      getAcceleratorProfileCount(
        initialAcceleratorProfile,
        servingRuntime.spec.containers[0].resources || {},
      )
  );
};

export const isModelServerEditInfoChanged = (
  createData: CreatingServingRuntimeObject,
  sizes: ServingRuntimeSize[],
  acceleratorProfileState: AcceleratorProfileState,
  editInfo?: ServingRuntimeEditInfo,
): boolean =>
  editInfo?.servingRuntime
    ? getDisplayNameFromK8sResource(editInfo.servingRuntime) !== createData.name ||
      editInfo.servingRuntime.spec.replicas !== createData.numReplicas ||
      !_.isEqual(getServingRuntimeSize(sizes, editInfo.servingRuntime), createData.modelSize) ||
      editInfo.servingRuntime.metadata.annotations?.['enable-route'] !==
        String(createData.externalRoute) ||
      editInfo.servingRuntime.metadata.annotations?.['enable-auth'] !==
        String(createData.tokenAuth) ||
      isAcceleratorProfileChanged(acceleratorProfileState, editInfo.servingRuntime) ||
      (createData.tokenAuth &&
        !_.isEqual(
          getServingRuntimeTokens(editInfo.secrets)
            .map((token) => token.name)
            .sort(),
          createData.tokens.map((token) => token.name).sort(),
        ))
    : true;

export const checkModelMeshFailureStatus = (status: DataScienceClusterKindStatus): string =>
  status.conditions.find(
    (condition) => condition.type === 'model-meshReady' && condition.status === 'False',
  )?.message || '';

export const isModelMesh = (inferenceService: InferenceServiceKind): boolean =>
  inferenceService.metadata.annotations?.['serving.kserve.io/deploymentMode'] === 'ModelMesh';
