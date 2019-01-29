import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TrendingNewestComponent } from './home/trending-newest/trending-newest.component';
import { FoodEstabComponent } from './food-estab/food-estab.component';
import { SearchPageComponent } from './search-page/search-page.component';

import { PrivacyPolicyComponent } from './navigation/privacy-policy/privacy-policy.component'
import { TermsOfServicesComponent } from './navigation/terms-of-services/terms-of-services.component'
import { AboutUsComponent } from './navigation/about-us/about-us.component';
const routes: Routes = [
  { path: '', redirectTo: '/shops', pathMatch: 'full' },
  { path: 'shops', component: TrendingNewestComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'shops/:shopId', component: FoodEstabComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-services', component: TermsOfServicesComponent},
  { path: 'about-us', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
