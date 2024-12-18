import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => import('./products/list/list.component').then(c => c.ListComponent) },
  { path: 'products/create', loadComponent: () => import('./products/create/create.component').then(c => c.CreateComponent) },
  { path: 'products/:id', loadComponent: () => import('./products/details/details.component').then(c => c.DetailsComponent) },
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent,
    CommonModule,
    FormsModule,
  ],
  declarations: [
     AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
