import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*
import { UserComponent } from './user/user.component';
*/
const routes: Routes = [
  { path: 'eat-up', redirectTo: '/eat-up/user/shops', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes);
