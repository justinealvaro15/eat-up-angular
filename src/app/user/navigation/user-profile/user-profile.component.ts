import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { UsersService } from '../../../admin/main-pages/users/users.service';
import { ReturnStatement } from '@angular/compiler';
import { User } from '../../../admin/main-pages/users/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: SocialUser;
  public loggedIn: boolean;
  public numReviews: any;
  public loggedInUser: User[];
  constructor(private authService: AuthService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.numReviews = this.getUserNumReviews(this.user.email)[0].reviews_made;
    });
  }
  getUserNumReviews(id) {
    this.loggedInUser = this.usersService.getFilteredUsers().filter(user =>{
        return user.user_id== id;
    });
    console.log(this.loggedInUser);
    return this.loggedInUser;
  }
}