// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { domain, clientId, firebase  } from '../auth_config.json';
import { CacheLocation } from '@auth0/auth0-spa-js';

export const environment = {
  production: false,
  domain,
    clientId,
    redirectUri: window.location.origin,
    cacheLocation: "localstorage" as CacheLocation,
    useRefreshTokens: true,
    firebase: firebase
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
