import * as React from 'react';
import { usePipelinesAPI } from '~/concepts/pipelines/context';
import useFetchState, { FetchState, FetchStateCallbackPromise } from '~/utilities/useFetchState';
import { ExperimentKF } from '~/concepts/pipelines/kfTypes';
import { POLL_INTERVAL } from '~/utilities/const';

const useExperiments = (): FetchState<ExperimentKF[]> => {
  const { api } = usePipelinesAPI();

  const call = React.useCallback<FetchStateCallbackPromise<ExperimentKF[]>>(
    (opts) => api.listExperiments(opts).then(({ experiments }) => experiments ?? []),
    [api],
  );

  return useFetchState(call, [], { refreshRate: POLL_INTERVAL });
};

export default useExperiments;
