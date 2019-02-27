import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UserRouting } from './user-routing.module';

import { UserComponent } from './user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { TrendingNewestComponent } from './home/trending-newest/trending-newest.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

import { SearchPageComponent } from './search-page/search-page.component';
import { FoodEstabComponent } from './food-estab/food-estab.component';
import { AddRatingReviewComponent, AddRatingReviewDialog } from './food-estab/add-rating-review/add-rating-review.component';
import { RatingComponent } from './food-estab/add-rating-review/rating/rating.component';
import { ReviewComponent } from './food-estab/add-rating-review/review/review.component';
import { AddtlDetailsComponent } from './food-estab/addtl-details/addtl-details.component';
import { ReviewsMenuComponent } from './food-estab/reviews-menu/reviews-menu.component';
import { MenuComponent } from './food-estab/reviews-menu/menu/menu.component';
import { ReviewsComponent, ReviewsDialog } from './food-estab/reviews-menu/reviews/reviews.component';
import { ShopCardComponent } from './home/shop-card/shop-card.component';
import { FcsSearchPipe } from './fcs-search.pipe';
import { LocationSearchPipe } from './location-search.pipe';
import { HomeSearchComponent } from './home/search-boxes/search-boxes.component';


import { AddMenuItemComponent, AddMenuItemDialog } from './food-estab/add-menu-item/add-menu-item.component';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatSelectModule,
  MatOptionModule,
  MatGridListModule
} from '@angular/material';
import { GoogleAuthComponent } from './navigation/google-auth/google-auth.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, LoginOpt} from "angularx-social-login";
import { MapComponent } from './food-estab/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { UserProfileComponent } from './navigation/user-profile/user-profile.component';
import { ArraySortPipe } from './pipes/alphabetical-sort.pipe';
import { TermsOfServicesComponent } from './navigation/terms-of-services/terms-of-services.component';
import { PrivacyPolicyComponent } from './navigation/privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './navigation/about-us/about-us.component';
import { NgSelect2Module } from 'ng-select2';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

const googleLoginOptions: LoginOpt = {
  client_id: "305506356766-0q3pes92ks9buimmcchbtek02f3an0oc",
  scope: 'profile email',
  hosted_domain: 'up.edu.ph'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


 let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("305506356766-0q3pes92ks9buimmcchbtek02f3an0oc", googleLoginOptions)
  }
]);
 
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    UserComponent,
    TrendingNewestComponent,
    HeaderComponent,
    SidenavListComponent,
    HomeSearchComponent,
    SearchPageComponent,
    FoodEstabComponent,
    AddRatingReviewComponent,
    RatingComponent,
    ReviewComponent,
    AddtlDetailsComponent,
    ReviewsMenuComponent,
    MenuComponent,
    ReviewsComponent,
    ShopCardComponent,
    FcsSearchPipe,
    LocationSearchPipe,
    AddMenuItemComponent,
    AddRatingReviewDialog,
    AddMenuItemDialog,
    ReviewsDialog,
    GoogleAuthComponent,
    MapComponent,
    UserProfileComponent,
    ArraySortPipe,
    TermsOfServicesComponent,
    PrivacyPolicyComponent,
    AboutUsComponent,
    TermsOfServicesComponent,
    UserProfileComponent
  ],
  entryComponents: [
    AddRatingReviewDialog,
    AddMenuItemDialog,
    ReviewsDialog
  ],
  imports: [
    FormsModule,
    BrowserModule,
    UserRouting,
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
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    SocialLoginModule,
    NgSelect2Module,
    MatSelectModule,
    MatOptionModule,
    MatGridListModule,
    LeafletModule.forRoot()
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [UserComponent]
})
export class UserModule { }
