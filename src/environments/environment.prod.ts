import authConfig from '../auth_config.json'

export const environment = {
  production: true,
  domain: authConfig.domain,
  clientId: authConfig.clientId,
  redirectUri: window.location.origin,
  useRefreshTokens: true,
  firebase: authConfig.firebase,
  api_connector: "http://localhost:27017"
};
