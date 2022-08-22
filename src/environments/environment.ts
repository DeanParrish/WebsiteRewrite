// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import authConfig from "../auth_config.json";
import { CacheLocation } from "@auth0/auth0-spa-js";

export const environment = {
  production: false,
  domain: authConfig.domain,
  clientId: authConfig.clientId,
  redirectUri: window.location.origin,
  cacheLocation: "localstorage" as CacheLocation,
  useRefreshTokens: true,
  firebase: authConfig.firebase,
  api_connector: "http://backend-app:2001",
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
