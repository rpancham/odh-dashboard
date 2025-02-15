import { act } from '@testing-library/react';
import { k8sGetResource } from '@openshift/dynamic-plugin-sdk-utils';
import { standardUseFetchState, testHook } from '~/__tests__/unit/testUtils/hooks';
import useElyraSecret from '~/concepts/pipelines/elyra/useElyraSecret';
import { mockSecretK8sResource } from '~/__mocks__/mockSecretK8sResource';

jest.mock('@openshift/dynamic-plugin-sdk-utils', () => ({
  k8sGetResource: jest.fn(),
}));

const k8sGetResourceMock = k8sGetResource as jest.Mock;

describe('useElyraSecret', () => {
  it('should return elyra secret when there is a DSPA', async () => {
    k8sGetResourceMock.mockReturnValue(
      Promise.resolve(mockSecretK8sResource({ uid: 'test-project-12m' })),
    );

    const renderResult = testHook(useElyraSecret)('test-project', true);
    expect(k8sGetResourceMock).toHaveBeenCalledTimes(1);
    expect(renderResult).hookToStrictEqual(standardUseFetchState(null));
    expect(renderResult).hookToHaveUpdateCount(1);

    // wait for update
    await renderResult.waitForNextUpdate();
    expect(k8sGetResourceMock).toHaveBeenCalledTimes(1);
    expect(renderResult).hookToStrictEqual(
      standardUseFetchState(mockSecretK8sResource({ uid: 'test-project-12m' }), true),
    );
    expect(renderResult).hookToHaveUpdateCount(2);
    expect(renderResult).hookToBeStable([false, false, true, true]);

    // refresh
    k8sGetResourceMock.mockReturnValue(Promise.resolve(mockSecretK8sResource({})));
    await act(() => renderResult.result.current[3]());
    expect(k8sGetResourceMock).toHaveBeenCalledTimes(2);
    expect(renderResult).hookToHaveUpdateCount(3);
    expect(renderResult).hookToBeStable([false, true, true, true]);
  });

  it('should handle when there is no DSPA', async () => {
    testHook(useElyraSecret)('test-project', false);
    expect(k8sGetResourceMock).toBeCalledTimes(0);
  });

  it('should handle 404 as an error', async () => {
    const error = {
      statusObject: {
        code: 404,
      },
    };
    k8sGetResourceMock.mockReturnValue(Promise.reject(error));

    const renderResult = testHook(useElyraSecret)('test-project', true);
    expect(k8sGetResourceMock).toHaveBeenCalledTimes(1);
    expect(renderResult).hookToStrictEqual(standardUseFetchState(null));
    expect(renderResult).hookToHaveUpdateCount(1);

    // wait for update
    await renderResult.waitForNextUpdate();
    expect(k8sGetResourceMock).toHaveBeenCalledTimes(1);
    expect(renderResult).hookToStrictEqual(standardUseFetchState(null, true));
    expect(renderResult).hookToHaveUpdateCount(2);
    expect(renderResult).hookToBeStable([false, false, true, true]);

    // refresh
    await act(() => renderResult.result.current[3]());
    expect(k8sGetResourceMock).toHaveBeenCalledTimes(2);
    expect(renderResult).hookToStrictEqual(standardUseFetchState(null, true));
    expect(renderResult).hookToHaveUpdateCount(3);
    expect(renderResult).hookToBeStable([true, true, false, true]);
  });

  it('should handle other errors and rethrow', async () => {
    k8sGetResourceMock.mockReturnValue(Promise.reject(new Error('error1')));

    const renderResult = testHook(useElyraSecret)('test-project', true);
    expect(k8sGetResourceMock).toHaveBeenCalledTimes(1);
    expect(renderResult).hookToStrictEqual(standardUseFetchState(null));
    expect(renderResult).hookToHaveUpdateCount(1);

    // wait for update
    await renderResult.waitForNextUpdate();
    expect(k8sGetResourceMock).toHaveBeenCalledTimes(1);
    expect(renderResult).hookToStrictEqual(standardUseFetchState(null, false, new Error('error1')));
    expect(renderResult).hookToHaveUpdateCount(2);
    expect(renderResult).hookToBeStable([true, true, false, true]);

    // refresh
    k8sGetResourceMock.mockReturnValue(Promise.reject(new Error('error2')));
    await act(() => renderResult.result.current[3]());
    expect(k8sGetResourceMock).toHaveBeenCalledTimes(2);
    expect(renderResult).hookToStrictEqual(standardUseFetchState(null, false, new Error('error2')));
    expect(renderResult).hookToHaveUpdateCount(3);
    expect(renderResult).hookToBeStable([true, true, false, true]);
  });
});
