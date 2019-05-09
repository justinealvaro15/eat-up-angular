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
import { MatDialog, MatDialogRef, MatDialogConfig,MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
;

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
  password:string;
  @Input() public adminSignIn: Function;

  constructor( 
    public location: Location, 
    private router: Router,
    private authService: AuthService,
    private usersService:UsersService,
    public dialog: MatDialog
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
     
      this.authService.authState.subscribe( //does not run when no logged in user
        (user) => {
        this.user = user;
        this.loggedIn = (user != null);
        //this.adminGuard();
        this.userLastActiveUpdate();
      });
  
      this.passCheck();
  }

  adminGuard () {
    console.log(this.user);
    if (this.user) { //If there is a logged in user
      this.usersService.setFilter(FilterKeys.Name_Or_Id, this.user.id);
      if (this.usersService.getFilteredAdmins()==[]) { //not admin
        window.alert("Unauthorized user");
        window.location.replace('http://localhost:4200/eat-up/user/shops'); 
      } else {
        window.alert("Welcome "+this.user.firstName+" "+ this.user.lastName);
      }
      this.usersService.setFilter(FilterKeys.Name_Or_Id,"");
    } 
    else {  //no logged in user
      window.alert("Unauthorized user");
      window.location.replace('http://localhost:4200/eat-up/user/shops');
    }
  }

  passCheck() : void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "350px";
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      password:this.password
    }
    this.dialog.open(PassDialog, dialogConfig);

    const dialogRef = this.dialog.open(PassDialog, dialogConfig);

    
    dialogRef.afterClosed().subscribe(result => {
      this.password = result;
      if (this.password!="cs192kathaeatup5919") {
        window.location.replace("http://studproj.up.edu.ph/eat-up/user/shops");
      } else {
        this.dialog.closeAll();
      }
    });
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

export class pw {
  type: string;
  pw: string;
}

@Component ({
  selector: 'pass-dialog',
  templateUrl: 'pass-dialog.html'
})

export class PassDialog {
  size = 12;
  width1 = 250;
  width2 = 100;
  height = 100;
  adminPassword:string;

  constructor (
    public dialogRef: MatDialogRef<PassDialog>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
  }

    ngOnInit() {
    }

  onNoClick(): void {  //or on activate user

    this.dialogRef.close();
    window.location.replace('http://studproj.up.edu.ph/eat-up/user/shops');
   
  }

  onYesClick() { //or on deactivate user
    this.dialogRef.close(this.adminPassword);


    
  }
}