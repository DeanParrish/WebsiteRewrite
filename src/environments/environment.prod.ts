import { domain, clientId, firebase  } from '../auth_config.json';
import { CacheLocation } from '@auth0/auth0-spa-js';

export const environment = {
  production: true,
  domain,
  clientId,
  redirectUri: window.location.origin,
  cacheLocation: "localstorage" as CacheLocation,
  useRefreshTokens: true,
  firebase: firebase,
  api_connector: "http://localhost:27017"
};
