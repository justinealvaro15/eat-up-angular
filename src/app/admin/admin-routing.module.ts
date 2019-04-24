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

import { StatsComponent } from './misc-pages/stats/stats.component';
import { RatingsReviewsComponent } from './misc-pages/stats/ratings-reviews/ratings-reviews.component';
import { UserContributionsComponent } from './misc-pages/stats/user-contributions/user-contributions.component';
import { AdminFoodEstabComponent } from './main-pages/food-establishments/admin-food-estab/admin-food-estab.component';
import {AdminGuard} from './admin.guard';

import {UserComponent} from '../user/user.component';

const routes: Routes =[
    { path: 'eat-up/admin',
    component: AdminComponent,
    children: [
    { path: '', component: DashboardComponent  },
    { path: 'dashboard',                   component: DashboardComponent,           canActivate:[AdminGuard]  },
    { path: 'admins',                      component: AdminsComponent,              canActivate:[AdminGuard]  },
    { path: 'users',                       component: UsersComponent,               canActivate:[AdminGuard]  },
    { path: 'food-establishments',         component: FoodEstablishmentsComponent,  canActivate:[AdminGuard]  },
    { path: 'menu',                        component: MenuComponent,                canActivate:[AdminGuard]  },
    { path: 'stats',                       component: StatsComponent,               canActivate:[AdminGuard]  },
    { path: 'stats/ratings-reviews',       component: RatingsReviewsComponent },
    { path: 'stats/user-contributions',    component: UserContributionsComponent },
    { path: 'food-establishments/:shopId', component: AdminFoodEstabComponent,      canActivate:[AdminGuard]  }
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
