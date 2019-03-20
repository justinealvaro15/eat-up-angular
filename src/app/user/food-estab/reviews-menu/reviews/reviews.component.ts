import {Component, Inject, Input} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Review } from 'app/user/reviews/reviews.model';
import { Subscription } from 'rxjs';
import { ReviewsService } from 'app/user/reviews/reviews.service';
import { Shop } from 'app/user/shops/shops.model';
import { SocialUser, AuthService } from 'angularx-social-login';
import { filter } from 'rxjs/operators';

export interface ReviewDialogData {
  review: Review;
}

@Component({
  selector: 'display-reviews',
  templateUrl: 'reviews.component.html',
  styleUrls: ['reviews.component.css']
})
export class ReviewsComponent {
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
      this.reviews = reviews;
    });
  }

  getFilteredReviews(): Review[] {
    return (this.user ? this.reviews.filter(_review => {
      return _review.user_id !== this.user.id;
    }) : this.reviews) || [];
  }

  openDialog(review: Review) {
    this.dialog.open(ReviewsDialog, {
      data: { //sample data for reference for server later
        review: review
      }
    });
  }
}

@Component({
  selector: 'reviews-dialog',
  templateUrl: 'reviews-dialog.component.html',
  styleUrls: ['reviews.component.css']
})
export class ReviewsDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReviewDialogData) {console.log(data);}
    
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
