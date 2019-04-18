import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'app/user/shops/shops.model';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Review } from 'app/user/reviews/reviews.model';
import { ReviewsService } from 'app/user/reviews/reviews.service';
import { MatDialog } from '@angular/material';
import { ReviewsDialog } from 'app/user/food-estab/reviews-menu/reviews/reviews.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AddRatingReviewDialog, AddedReview } from 'app/user/food-estab/add-rating-review/add-rating-review.component';
import * as moment from 'moment';

export interface DialogData {
  addReviewFormGroup: FormGroup;
  isEdit?: boolean;
}

@Component({
  selector: 'app-review-user',
  templateUrl: './review-user.component.html',
  styleUrls: ['./review-user.component.scss']
})
export class ReviewUserComponent implements OnInit {
  @Input() shop: Shop;
  @Input() reviews: Review[];
  addReviewFormGroup: FormGroup;

  public user: SocialUser;
  public loggedIn: boolean;

  // reviews: Review[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewsService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit () {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    // this.reviewService.getReviewsByNewest(this.shop.fe_id).subscribe((reviews) => {
    //   this.reviews = reviews;
    // });
    this.addReviewFormGroup = this.formBuilder.group({
      rating: new FormControl(),
      review: new FormControl()
    });
  }

  getFilteredReviews(): Review[] {
    return (this.user ? this.reviews.filter(_review => {
      return _review.user_id == this.user.id;
    }) : this.reviews) || [];
  }

  openReview(review: Review) {
    this.addReviewFormGroup.get('rating').setValue(review.rating);
    this.addReviewFormGroup.get('review').setValue(review.review);

    const dialogRef = this.dialog.open(AddRatingReviewDialog, {
      width: '500px',
      data: {
        addReviewFormGroup: this.addReviewFormGroup,
        isEdit: true
      }
    });

    dialogRef.afterClosed().subscribe((result: AddedReview) => {
      if (result && result.rating && result.review) {
        review.rating = result.rating;
        review.review = result.review;
        review.date = moment().format('lll');

        let newAvgRating: number = this.shop.fe_avg_rating * this.reviews.length;
        newAvgRating += result.rating;
        newAvgRating -= result.oldRating;
        newAvgRating /= (this.reviews.length);
        
        this.shop.fe_avg_rating = newAvgRating;

        this.reviewService.editReviewByShopid(this.shop.fe_id, result.rating, result.review);
        window.alert("You have edited your review.");
      }
    })
  }


}
