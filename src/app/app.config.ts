import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ListComponent } from './products/list/list.component';
import { provideComponent } from '@angular/core';

export const appConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideComponent(ListComponent), // Регистрируем ListComponent
  ]
};
