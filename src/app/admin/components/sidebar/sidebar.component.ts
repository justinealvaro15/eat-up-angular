import { Component, OnInit } from '@angular/core';
import { SocialUser } from "angularx-social-login";
import { AuthService } from "angularx-social-login";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/eat-up/admin/admins', title: 'Admins',  icon:'person', class: '' },
    { path: '/eat-up/admin/users', title: 'Users',  icon:'people', class: '' },
    { path: '/eat-up/admin/food-establishments', title: 'Food Establishments',  icon:'restaurant', class: '' },
    { path: '/eat-up/admin/menu', title: 'Menu',  icon:'content_paste', class: '' },
    /*
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    */
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public  user: SocialUser;
  public loggedIn: boolean;
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
