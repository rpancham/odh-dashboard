import { Patch } from '@openshift/dynamic-plugin-sdk-utils';
import _ from 'lodash';
import { Toleration, TolerationEffect, TolerationOperator, TolerationSettings } from '~/types';
import { DashboardConfigKind, NotebookKind } from '~/k8sTypes';
import { AcceleratorProfileState } from './useAcceleratorProfileState';

export type TolerationChanges = {
  type: 'add' | 'remove' | 'replace' | 'nothing';
  settings: Toleration[];
};

export const determineTolerations = (
  tolerationSettings?: TolerationSettings,
  acceleratorProfileState?: AcceleratorProfileState,
  existingTolerations?: Toleration[],
): Toleration[] => {
  let tolerations = existingTolerations || [];

  // remove old accelerator tolerations if they exist
  if (acceleratorProfileState?.initialAcceleratorProfile) {
    tolerations = tolerations.filter(
      (t) =>
        !acceleratorProfileState.initialAcceleratorProfile?.spec.tolerations?.some((t2) =>
          _.isEqual(t2, t),
        ),
    );
  }

  // add new accelerator tolerations if they exist
  if (acceleratorProfileState?.acceleratorProfile?.spec.tolerations) {
    tolerations.push(...acceleratorProfileState.acceleratorProfile.spec.tolerations);
  }

  // remove duplicated tolerations
  tolerations = _.uniqWith(tolerations, _.isEqual);

  // add toleration from settings if they exist
  if (
    tolerationSettings?.enabled &&
    !tolerations.some(
      (t) =>
        t.key === tolerationSettings.key && t.operator === 'Exists' && t.effect === 'NoSchedule',
    )
  ) {
    tolerations.push({
      effect: TolerationEffect.NO_SCHEDULE,
      key: tolerationSettings.key,
      operator: TolerationOperator.EXISTS,
    });
  }

  return tolerations;
};

export const computeNotebooksTolerations = (
  dashboardConfig: DashboardConfigKind,
  notebook: NotebookKind,
): TolerationChanges => {
  const tolerations = notebook.spec.template.spec.tolerations || [];

  const settings = determineTolerations(
    dashboardConfig.spec.notebookController?.notebookTolerationSettings,
    undefined,
    tolerations,
  );

  const hasTolerations = !!tolerations && tolerations.length > 0;
  const doNothing = settings.length === 0 && !hasTolerations;
  const tolerationsRemoved = settings.length === 0 && hasTolerations;
  const updateTolerations = settings.length > 0 && hasTolerations;

  let type: TolerationChanges['type'];
  if (tolerationsRemoved) {
    type = 'remove';
  } else if (updateTolerations) {
    type = 'replace';
  } else if (doNothing) {
    type = 'nothing';
  } else {
    type = 'add';
  }

  return {
    type,
    settings,
  };
};

export const getTolerationPatch = (tolerationChanges: TolerationChanges): Patch | null => {
  const tolerationPath = '/spec/template/spec/tolerations';
  switch (tolerationChanges.type) {
    case 'remove':
      return {
        op: tolerationChanges.type,
        path: tolerationPath,
      };
    case 'replace':
    case 'add':
      return {
        op: tolerationChanges.type,
        path: tolerationPath,
        value: tolerationChanges.settings,
      };
    case 'nothing':
    default:
      return null;
  }
};
