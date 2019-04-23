import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private _router: Subscription;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  private user: SocialUser;
  public loggedIn: boolean;

  constructor( 
    public location: Location, 
    private router: Router,
    private authService: AuthService,
    private usersService:UsersService,
    public dialog: MatDialog,) {}

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
        this.userLastActiveUpdate();
      });
     // this.adminLogin();
  }
 
  signInWithGoogle(): void { 
    /*
      1.Prevent accessing other admin pages by auto redirecting to users page if not admin //solved with guards
      2. if google login closed auto redirect to users 
      3. google log in pop up on admin home page
      */
    
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  adminLogin() {
    const dialogRef = this.dialog.open(AdminLoginDialog, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {        
    });
  }

  userLastActiveUpdate(){
    console.log("PRINT IS YOUR FRIEND");
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


@Component ({
  selector: 'admin-login-dialog',
  templateUrl: 'admin-login-dialog.html'
})

export class AdminLoginDialog {
  size = 12;
  width1 = 250;
  width2 = 100;
  height = 100;

  constructor (
    public dialogRef: MatDialogRef<AdminLoginDialog>,
    private authService: AuthService,
    private usersService:UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void { //on make admin
    this.signInWithGoogle();
  }

  signInWithGoogle(): void { 
    /*
      1.Prevent accessing other admin pages by auto redirecting to users page if not admin
      2. if google login closed auto redirect to users
      3. google log in pop up on admin home page
      */
    
    
  }

}
