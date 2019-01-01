import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TrendingNewestComponent } from './home/trending-newest/trending-newest.component';
import { FoodEstabComponent } from './food-estab/food-estab.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/shops', pathMatch: 'full' },
  { path: 'shops', component: TrendingNewestComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'shops/:shopId', component: FoodEstabComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
