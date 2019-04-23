import { Component, OnInit, Input } from '@angular/core';
 
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { User } from "../../../admin/main-pages/users/user.model";
import { UsersService, FilterKeys } from "../../../admin/main-pages/users/users.service";

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})

export class GoogleAuthComponent implements OnInit {

  private user: SocialUser;
  public loggedIn: boolean;

  //to know whether it was accessed from sidenav or header
  @Input () sidenav: boolean;
  @Input () header: boolean;

  ngOnInit() {
  	this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

  }

  constructor(
    private authService: AuthService,
    private usersService:UsersService
    ) { }

  signInWithGoogle(): void {
    //window.alert("Sign in with your UP Mail account."); No need since the google log in pop up will inform the user
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(response => {
      this.usersService.setFilter(FilterKeys.Name_Or_Id, this.user.id);
      if (this.usersService.getFilteredUsers()==[]) {
        this.addUser();
      } 
    }
     
    ); 

  }


  addUser() {
      //ADD NEW USER
      console.log("no log in");
      const date = new Date();
      const newUser: User = {
         user_id: this.user.id,
         first_name: this.user.firstName,
         last_name: this.user.lastName,
         photoUrl: this.user.photoUrl,
         date_joined: {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
         },
         last_active: {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
              hour: date.getHours(),
              minute: date.getMinutes(),
              second: date.getSeconds()
            },
            deactivated: {
              deactivated_by: null,
              deactivated_on: {
              year: null,
              month: null,
              day: null,
              hour: null,
              minute: null,
              second: null
             }
           },
        reviews_made: 0,
        active: true,
        isAdmin: false
    }
        this.usersService.addUser(newUser);
  }
  
  signOut(): void {
    this.authService.signOut();
  }

  updateLastActive () {
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

 

}

/*use a service between this component to whatever component needs the user details (name and email and photoUrl) */