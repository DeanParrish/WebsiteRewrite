import authConfig from '../auth_config.json'
import { CacheLocation } from '@auth0/auth0-spa-js';

export const environment = {
  production: true,
  domain: authConfig.domain,
  clientId: authConfig.clientId,
  redirectUri: window.location.origin,
  cacheLocation: "localstorage" as CacheLocation,
  useRefreshTokens: true,
  firebase: authConfig.firebase,
  api_connector: "http://localhost:27017"
};
