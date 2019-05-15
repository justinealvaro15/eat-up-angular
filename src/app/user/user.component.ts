import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { UsersService } from "../admin/main-pages/users/users.service";
import {AppService} from '../app.service';


@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  private user: SocialUser;
  public loggedIn: boolean;
  title = "eatUP";
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private usersService:UsersService,
    public appService:AppService
    ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.userLastActiveUpdate();
    });
    this.appService.incTotalPageViews();
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
}