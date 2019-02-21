import {Component, Inject, Input} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { Review } from 'app/user/reviews/reviews.model';
import { Subscription } from 'rxjs';
import { ReviewsService } from 'app/user/reviews/reviews.service';
import { Shop } from 'app/user/shops/shops.model';

export interface ReviewDialogData {
  review: Review;
}

@Component({
  selector: 'display-reviews',
  templateUrl: 'reviews.component.html',
  styleUrls: ['reviews.component.css'],
})
export class ReviewsComponent {
  @Input() shop: Shop;
  reviews: Review[] = [];

  constructor(
    private reviewService: ReviewsService,
    private dialog: MatDialog
  ) {}

  ngOnInit () {
    this.reviewService.getReviewsByNewest(this.shop.fe_id).subscribe((reviews) => {
      this.reviews = reviews
    });
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
  // styleUrls: ['reviews.component.css']
})
export class ReviewsDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReviewDialogData) {}
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
