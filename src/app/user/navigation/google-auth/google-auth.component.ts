import { Component, OnInit, Input } from '@angular/core';
 
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { User } from "../../../admin/main-pages/users/user.model";
import { UsersService, FilterKeys } from "../../../admin/main-pages/users/users.service";

//https://www.npmjs.com/package/angularx-social-login
//https://github.com/kangw3n/angular4-social-login/tree/0bb654f7034d7d154d59e629005203b397144f11

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
    //maybe do the adding here?
    if (this.loggedIn) { //there is a logged in user
      this.usersService.setFilter(FilterKeys.Name_Or_Email,this.user.email);
      if (!this.usersService.getFilteredUsers()) { //NEW USER
        this.addUser(); //add new user to DB
      } else { //RETURNING USER

      }
     
    }
  }

  constructor(
    private authService: AuthService,
    private usersService:UsersService
    ) { }

  signInWithGoogle(): void {
    console.log("in signInWithGoogle");
    //window.alert("Sign in with your UP Mail account."); No need since the google log in pop up will inform the user
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID); 

  }


  addUser() {
      //ADD NEW USER
      console.log("no log in");
      const date = new Date();
      const newUser: User = {
         email: this.user.email,
         name: this.user.firstName + " " + this.user.lastName,
         photo: this.user.photoUrl,
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
            removed: {
              removed_by: null,
              removed_on: {
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
    
  }

 

}

/*use a service between this component to whatever component needs the user details (name and email and photoUrl) */