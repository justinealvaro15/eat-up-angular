import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './misc-pages/dashboard/dashboard.component';
import { AdminsComponent } from './main-pages/admins/admins.component';
import { UsersComponent } from './main-pages/users/users.component';
import { FoodEstablishmentsComponent } from './main-pages/food-establishments/food-establishments.component';
import { MenuComponent } from './main-pages/menu/menu.component';



const routes: Routes =[
    { path: 'eat-up/admin',
    component: AdminComponent,
    children: [
    { path: '', component: DashboardComponent  },
    { path: 'dashboard',                component: DashboardComponent },
    { path: 'admins',                   component: AdminsComponent},
    { path: 'users',                    component: UsersComponent},
    { path: 'food-establishments',      component: FoodEstablishmentsComponent},
    { path: 'menu',                     component:MenuComponent}
    ]}
  ];
    // { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }


export const AdminRouting = RouterModule.forRoot(routes);
