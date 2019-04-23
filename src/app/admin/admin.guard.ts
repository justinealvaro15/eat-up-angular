import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, SocialUser } from 'angularx-social-login';
import { UsersService, FilterKeys } from "./main-pages/users/users.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private user: SocialUser;
  public loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private usersService:UsersService,
    private router:Router
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
    if (this.user) { //not logged in 
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
