import { FetchMock } from 'jest-fetch-mock';
import * as networkUtils from '../network';

const { getEnv } = networkUtils.__testables__; // eslint-disable-line no-underscore-dangle
const fetchMock = fetch as FetchMock;

const defaultUrl = 'https://my-custom-api';
const defaultConfig = {
  method: 'GET',
  cors: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

it('should return appropriate environment', () => {
  expect(getEnv()).toEqual('local');

  /**
   * Note: improve this test case to match your custom `getEnv` method
   */
});

it('should return url for given key', () => {
  /**
   * Note: Add your test case to test `getUrl` method with your endpoint(s)
   */
});

describe('test genericFetch', () => {
  const mockSuccessResponse = JSON.stringify({
    data: {
      query: {
        now: '2019-02-09T08:12:11.736Z',
      },
    },
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('default config fetch call should succeed', async () => {
    // mock first
    fetchMock.mockResponseOnce(mockSuccessResponse);

    const response = await networkUtils.genericFetch(defaultUrl);

    // check default behaviour
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(defaultUrl);
    expect(fetchMock.mock.calls[0][1]).toEqual(defaultConfig);

    // check content
    const result = await response.json();
    expect(JSON.stringify(result)).toEqual(mockSuccessResponse);
  });

  it('custom config fetch call should succeed', async () => {
    // mock first
    fetchMock.mockResponseOnce(mockSuccessResponse);

    // config
    const config = {
      method: 'POST',
      cors: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const response = await networkUtils.genericFetch(defaultUrl, config);

    // check default behaviour
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(defaultUrl);
    expect(fetchMock.mock.calls[0][1]).toEqual(config);

    // check content
    const result = await response.json();
    expect(JSON.stringify(result)).toEqual(mockSuccessResponse);
  });

  it('should handle basic network issues', async () => {
    const error = new Error('Custom Network Error');

    // mock first
    fetchMock.mockReject(error);

    try {
      await networkUtils.genericFetch(defaultUrl);
    } catch (requestError) {
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(defaultUrl);

      // check for error
      expect(requestError).toEqual(error);
    }
  });

  it('should handle wrong network status', async () => {
    const getErrorMessage = (status: number) =>
      `Network error detected, status code: ${status}`;

    // mock responses
    fetchMock.mockResponses(
      [mockSuccessResponse, { status: 300 }],
      [mockSuccessResponse, { status: 100 }]
    );

    // test for status code >= 300
    try {
      await networkUtils.genericFetch(defaultUrl);
    } catch (requestError) {
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(defaultUrl);

      expect(requestError).toEqual(new Error(getErrorMessage(300)));
    }

    // test for status code < 200
    try {
      await networkUtils.genericFetch(defaultUrl);
    } catch (requestError) {
      expect(fetchMock.mock.calls.length).toEqual(2);
      expect(fetchMock.mock.calls[1][0]).toEqual(defaultUrl);

      expect(requestError).toEqual(new Error(getErrorMessage(100)));
    }
  });
});

describe('test genericJsonFetch', () => {
  const mockSuccessData = {
    data: {
      query: {
        now: '2019-02-09T08:12:11.736Z',
      },
    },
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('default config fetch call should succeed', async () => {
    // mock first
    fetchMock.mockResponseOnce(JSON.stringify(mockSuccessData));

    const response = await networkUtils.genericJsonFetch(defaultUrl);

    // check default behaviour
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(defaultUrl);
    expect(fetchMock.mock.calls[0][1]).toEqual(defaultConfig);

    // check content
    expect(response).toEqual(mockSuccessData);
  });

  it('should handle wrong network status with json fetch', async () => {
    const getErrorMessage = (status: number) =>
      `Network error detected, status code: ${status}`;

    // mock responses
    fetchMock.mockResponses([JSON.stringify(mockSuccessData), { status: 300 }]);

    // test for status code >= 300
    try {
      await networkUtils.genericJsonFetch(defaultUrl);
    } catch (requestError) {
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(defaultUrl);

      expect(requestError).toEqual(new Error(getErrorMessage(300)));
    }
  });

  it('should handle invalid json data', async () => {
    // mock first
    fetchMock.mockResponseOnce(JSON.stringify(mockSuccessData)); // don't create valid JSON here

    try {
      await networkUtils.genericJsonFetch(defaultUrl);
    } catch (requestError) {
      // check default behaviour
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(defaultUrl);
      expect(fetchMock.mock.calls[0][1]).toEqual(defaultConfig);

      expect(requestError).toEqual(requestError);
    }
  });
});
