import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { ListComponent } from './app/products/list/list.component';
import { CreateComponent } from './app/products/create/create.component';
import { DetailsComponent } from './app/products/details/details.component';

// Маршруты
const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ListComponent },
  { path: 'products/create', component: CreateComponent },
  { path: 'products/:id', component: DetailsComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch(err => console.error(err));
