import networkEndpoints from '../config/network_endpoints.json';

const defaultConfig = {
  method: 'GET',
  cors: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const getEnv = () => {
  const url = window.location.href.toLowerCase();
  // check for localhost / 127.0.0.1
  if (url.indexOf('localhost') || url.indexOf('127.0.0.1')) {
    return 'local';
  }

  return process.env.NODE_ENV;
};

export const getUrl = (key) => {
  const subfolder = networkEndpoints[key];
  return subfolder[getEnv()];
};

// generic call definitions
// eslint-disable-next-line @typescript-eslint/no-explicit-any


export const genericFetch = (url, config = {}) => {
  const newConfig = {
    ...defaultConfig,
    ...config,
  };

  return fetch(url, newConfig)
    .catch((error) => Promise.reject(error))
    .then((response) => {
      const { ok, status } = response;
      if (!ok || status >= 300 || status < 200) {
        // invalid
        const message = `Network error detected, status code: ${status}`;
        return Promise.reject(new Error(message));
      }

      return Promise.resolve(response);
    });
};

export const genericJsonFetch = (url, config) =>
  genericFetch(url, config)
    // stop if generic fetch fails
    .catch((error) => Promise.reject(error))
    // get json response
    .then((response) =>
      response
        .json()
        // handle invalid json payload
        .catch((error) => Promise.reject(error))
    );

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __testables__ = {
  getEnv,
};

export default {
  getUrl,
  genericFetch,
  genericJsonFetch,
};
