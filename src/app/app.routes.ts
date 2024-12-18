import { Routes } from '@angular/router';
import { ListComponent } from './products/list/list.component';
import { CreateComponent } from './products/create/create.component';
import { DetailsComponent } from './products/details/details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ListComponent },
  { path: 'products/create', component: CreateComponent },
  { path: 'products/:id', component: DetailsComponent },
  { path: '**', redirectTo: 'products' }
];
