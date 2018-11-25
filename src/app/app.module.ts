import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTabsModule,MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';

import { TrendingNewestComponent } from './home/trending-newest/trending-newest.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
// import { SearchBoxesComponent } from './search-boxes/search-boxes.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchResultsComponent } from './search-page/search-results/search-results.component';
import { FoodEstabComponent } from './food-estab/food-estab.component';
import { FoodEstabDisplayComponent } from './food-estab/food-estab-display/food-estab-display.component';
import { AddRatingReviewComponent } from './food-estab/add-rating-review/add-rating-review.component';
import { RatingComponent } from './food-estab/add-rating-review/rating/rating.component';
import { ReviewComponent } from './food-estab/add-rating-review/review/review.component';
import { AddtlDetailsComponent } from './food-estab/addtl-details/addtl-details.component';
import { ReviewsMenuComponent } from './food-estab/reviews-menu/reviews-menu.component';
import { MenuComponent } from './food-estab/reviews-menu/menu/menu.component';
import { ReviewsComponent } from './food-estab/reviews-menu/reviews/reviews.component';
import { ShopCardComponent } from './home/shop-card/shop-card.component';
// import { MapComponent } from './map/map.component';
// import { HomeSearchComponent } from './home-search/home-search.component';
import { FcsSearchPipe } from './fcs-search.pipe';
import { LocationSearchPipe } from './location-search.pipe';
import { HomeSearchComponent } from './home/search-boxes/search-boxes.component';

@NgModule({
  declarations: [
    AppComponent,
    TrendingNewestComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    SignInComponent,
    HomeSearchComponent,
    // SearchBoxesComponent,
    SearchPageComponent,
    SearchResultsComponent,
    FoodEstabComponent,
    FoodEstabDisplayComponent,
    AddRatingReviewComponent,
    RatingComponent,
    ReviewComponent,
    AddtlDetailsComponent,
    ReviewsMenuComponent,
    MenuComponent,
    ReviewsComponent,
    ShopCardComponent,
    // MapComponent,
    // HomeSearchComponent,
    FcsSearchPipe,
    LocationSearchPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    FlexLayoutModule,
    MatCardModule,
    HttpClientModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
