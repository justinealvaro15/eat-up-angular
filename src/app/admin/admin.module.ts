import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRouting } from './admin-routing.module';
import { AdminComponent} from './admin.component';

/*main-pages*/
import {AdminsComponent} from './main-pages/admins/admins.component';
import { UsersComponent } from './main-pages/users/users.component';
import { FoodEstablishmentsComponent } from './main-pages/food-establishments/food-establishments.component';
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
  MatIconModule
} from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    MatIconModule
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
  ]
})

export class AdminModule {}
