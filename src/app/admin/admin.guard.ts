import { Injectable,OnInit} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, SocialUser } from 'angularx-social-login';
import { UsersService, FilterKeys } from "./main-pages/users/users.service";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, OnInit {

  private user: SocialUser;
  public loggedIn: boolean;
  id:string;
  constructor(
    private authService: AuthService,
    private usersService:UsersService,
    private appService:AppService
  ) {}
    ngOnInit() {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
      });
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    this.user = this.appService.getUser();
    window.alert(this.user);
    if (this.user) { //check if there's a user logged in

      this.usersService.setFilter(FilterKeys.Name_Or_Id, this.user.id);
      if (this.usersService.getFilteredAdmins()==[]) { //logged in but not an admin
          //window.alert("Unauthorized User"); no alert to give no clue 
          window.location.reload();
          return false;
      }
      return true;
    }
    //window.alert("Unauthorized User");  no alert to give no clue 
    window.location.reload();
    return false;

  }

}
