import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'app/user/shops/shops.model';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Review } from 'app/user/reviews/reviews.model';
import { ReviewsService } from 'app/user/reviews/reviews.service';
import { MatDialog } from '@angular/material';
import { ReviewsDialog } from 'app/user/food-estab/reviews-menu/reviews/reviews.component';


@Component({
  selector: 'app-review-user',
  templateUrl: './review-user.component.html',
  styleUrls: ['./review-user.component.scss']
})
export class ReviewUserComponent implements OnInit {
  @Input() shop: Shop;
  public user: SocialUser;
  public loggedIn: boolean;

  reviews: Review[] = [];

  constructor(
    private reviewService: ReviewsService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit () {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.reviewService.getReviewsByNewest(this.shop.fe_id).subscribe((reviews) => {
      this.reviews = reviews.filter(_review => {
        return _review.user_id == this.user.id;
      })
    });
  }
}
