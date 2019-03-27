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
  MatDialogModule
} from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatsComponent } from './misc-pages/stats/stats.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { AddAdminComponent } from './main-pages/admins/add-admin/add-admin.component';
import { UserSearchComponent } from './main-pages/users/user-search/user-search.component';
import { UserListComponent, MakeAdminDialog, DeacUserDialog } from './main-pages/users/user-list/user-list.component';
import { UserCardComponent } from './main-pages/users/user-card/user-card.component';

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
    NgxMaterialTimepickerModule
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
    UserCardComponent,
    AddShopDialog

  ],
  entryComponents: [
    MakeAdminDialog,
    DeacUserDialog,
    AddShopDialog
  ]
})

export class AdminModule {}
