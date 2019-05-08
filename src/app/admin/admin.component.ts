import { Component, Inject, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from '../../app/admin/components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { UsersService, FilterKeys } from "../admin/main-pages/users/users.service";
import { GoogleLoginProvider } from "angularx-social-login";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {AppService} from '../app.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  private user: SocialUser;
  public loggedIn: boolean;

  @Input() public adminSignIn: Function;

  constructor( 
    public location: Location, 
    private router: Router,
    private authService: AuthService,
    private usersService:UsersService,
    public dialog: MatDialog,
    private appService:AppService
    ) {}

  ngOnInit() {    
      const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

      if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
          // if we are on windows OS we activate the perfectScrollbar function

          document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
      } else {
          document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
      }
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

      this.location.subscribe((ev:PopStateEvent) => {
          this.lastPoppedUrl = ev.url;
      });
       this.router.events.subscribe((event:any) => {
          if (event instanceof NavigationStart) {
             if (event.url != this.lastPoppedUrl)
                 this.yScrollStack.push(window.scrollY);
         } else if (event instanceof NavigationEnd) {
             if (event.url == this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             } else
                 window.scrollTo(0, 0);
         }
      });
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
           elemMainPanel.scrollTop = 0;
           elemSidebar.scrollTop = 0;
      });
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
          let ps = new PerfectScrollbar(elemMainPanel);
          ps = new PerfectScrollbar(elemSidebar);
      }

      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        console.log("IN");
        this.adminGuard();
        this.userLastActiveUpdate();
      });
      this.adminGuard();


  }

  adminGuard () {
    if (this.user) { //If there is a logged in user
      this.usersService.setFilter(FilterKeys.Name_Or_Id, this.user.id);
      if (this.usersService.getFilteredAdmins()==[]) { //not admin
        window.alert("Unauthorized user");
        window.location.replace('http://localhost:4200/eat-up/user/shops'); 
      } else {
        window.alert("Welcome "+this.user.firstName+" "+ this.user.lastName);
      }
      this.usersService.setFilter(FilterKeys.Name_Or_Id,"");
    } else {  //no logged in user
      window.alert("Unauthorized user");
      window.location.replace('http://localhost:4200/eat-up/user/shops');
    }
  }
 


  userLastActiveUpdate(){
    const date = new Date();
    const lastActiveUpdate = {
      user_id: this.user.id,
      last_active: {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
        }
    }
    this.usersService.updateUserLastActive(lastActiveUpdate);
  }
  
  ngAfterViewInit() {
      this.runOnRouteChange();
  }
  isMaps(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
          return false;
      }
      else {
          return true;
      }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }
  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

}