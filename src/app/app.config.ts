import {ApplicationConfig, inject, provideAppInitializer} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpHandlerFn, HttpRequest, provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {environment} from '../environments/environment';
import {UserFacade} from './api/facade/user.facade';
import {firstValueFrom} from 'rxjs';
import {provideAnimations} from '@angular/platform-browser/animations';


export const appInitializer = provideAppInitializer(() => {
  const userFacade = inject(UserFacade);
  userFacade.getUser()
});

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(
    withFetch(),
    withInterceptors([authInterceptor])
  ),
    appInitializer,
    provideAnimationsAsync(),
    provideAnimations()
  ]
};

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('Authorization', 'Bearer ' + environment.apiToken),
  });
  return next(newReq);
}

