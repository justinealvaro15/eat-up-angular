import { Injectable,OnInit} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, SocialUser } from 'angularx-social-login';
import { UsersService, FilterKeys } from "./main-pages/users/users.service";
import {AppService} from "../app.service";
import {Resolve} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, Resolve<any> {

  private user: SocialUser;
  private loggedIn: boolean;
  id:string;
  constructor(
    private authService: AuthService,
    private usersService:UsersService,
    private appService:AppService
  ) {}
  
  resolve(route: ActivatedRouteSnapshot) {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
  
 
    //window.alert(this.loggedIn+" 32 lin");
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
