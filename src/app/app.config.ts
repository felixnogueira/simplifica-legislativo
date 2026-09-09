import { CheckOutline, CopyOutline, FileTextOutline, LinkOutline, ReadFill, ReadOutline, SendOutline } from '@ant-design/icons-angular/icons';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNzI18n, pt_BR } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzIcons([ReadOutline, ReadFill, FileTextOutline, CopyOutline, CheckOutline, SendOutline, LinkOutline]),
    provideNzI18n(pt_BR),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
  ],
};