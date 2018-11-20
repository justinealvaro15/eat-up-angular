import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './auth/sign-in/sign-in.component';
import { TrendingNewestComponent } from './home/trending-newest/trending-newest.component';
import { ShopViewComponent } from './shops/shop-view/shop-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/shops', pathMatch: 'full' },
  { path: 'shops', component: TrendingNewestComponent },
  { path: 'shops/:shopId', component: ShopViewComponent },
  { path: 'sign-in', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
