import { Component, OnInit, Input } from '@angular/core';
import { Shop } from './../../shops/shops.model';
import { Review } from 'app/user/reviews/reviews.model';
import { SocialUser } from "angularx-social-login";
import { AuthService } from "angularx-social-login";

@Component({
  selector: 'app-reviews-menu',
  templateUrl: './reviews-menu.component.html',
  styleUrls: ['./reviews-menu.component.css']
})
export class ReviewsMenuComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  @Input() shop: Shop;
  @Input() reviews: Review[];
}
