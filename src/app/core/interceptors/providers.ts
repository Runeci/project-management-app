import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

import { TokenInterceptor } from './token.interceptor';

export const INTERCEPTOR_PROVIDERS: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
];
