import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRouting } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

/*main-pages*/
import { AdminsComponent } from './main-pages/admins/admins.component';
import { UsersComponent } from './main-pages/users/users.component';
import { FoodEstablishmentsComponent, AddShopDialog } from './main-pages/food-establishments/food-establishments.component';
import { MenuComponent } from './main-pages/menu/menu.component';

/* misc-pages*/
import { DashboardComponent } from './misc-pages/dashboard/dashboard.component';
import { NotificationsComponent } from './misc-pages/notifications/notifications.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatGridListModule,
  MatIconModule,
  MatDividerModule,
  MatListModule,
  MatDialogModule,
  MatCardModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatSlideToggleModule
} from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatsComponent } from './misc-pages/stats/stats.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { AddAdminComponent } from './main-pages/admins/add-admin/add-admin.component';
import { UserSearchComponent } from './main-pages/users/user-search/user-search.component';
import { UserListComponent, MakeAdminDialog, DeacUserDialog, AcUserDialog
 } from './main-pages/users/user-list/user-list.component';
import { UserCardComponent } from './main-pages/users/user-card/user-card.component';
import { ShopCardAdminComponent } from './main-pages/food-establishments/shop-card-admin/shop-card-admin.component';
import { AdminsListComponent, DeacAdminDialog } from './main-pages/admins/admins-list/admins-list.component';
import { AdminSearchComponent } from './main-pages/admins/admin-search/admin-search.component';
import { RatingsReviewsComponent } from './misc-pages/stats/ratings-reviews/ratings-reviews.component';
import { UserContributionsComponent } from './misc-pages/stats/user-contributions/user-contributions.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminFoodEstabComponent } from './main-pages/food-establishments/admin-food-estab/admin-food-estab.component';
import { AdminMenuComponent } from './main-pages/food-establishments/admin-food-estab/admin-menu/admin-menu.component';
import { AdminMenuItemComponent } from './main-pages/food-establishments/admin-food-estab/admin-menu/admin-menu-item/admin-menu-item.component';
import { AdminAddMenuItemComponent, AdminAddMenuItemDialog } from './main-pages/food-establishments/admin-food-estab/admin-menu/admin-add-menu-item/admin-add-menu-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AdminRouting,
    RouterModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxMaterialTimepickerModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule
  ],
  declarations: [
    AdminComponent,
    DashboardComponent,
    AdminsComponent,
    UsersComponent,
    FoodEstablishmentsComponent,
    MenuComponent,
    SidebarComponent,
    NavbarComponent,
    NotificationsComponent,
    StatsComponent,
    TableListComponent,
    TypographyComponent,
    UpgradeComponent,
    UserProfileComponent,
    // AddAdminComponent,
    UserSearchComponent,
    UserListComponent,
    MakeAdminDialog,
    DeacUserDialog,
    AcUserDialog,
    DeacAdminDialog,
    UserCardComponent,
    AddShopDialog,
    ShopCardAdminComponent,
    AdminsListComponent,
    AdminSearchComponent,
    RatingsReviewsComponent,
    UserContributionsComponent,
    AdminFoodEstabComponent,
    AdminMenuComponent,
    AdminMenuItemComponent,
    AdminAddMenuItemComponent,
    AdminAddMenuItemDialog
  ],
  entryComponents: [
    MakeAdminDialog,
    DeacUserDialog,
    AcUserDialog,
<<<<<<< HEAD
    AddShopDialog,
    AdminAddMenuItemDialog
=======
    DeacAdminDialog,
    AddShopDialog
>>>>>>> 6293e1b70d4cb983119add55efaee4007938ecce
  ]
})

export class AdminModule {}
