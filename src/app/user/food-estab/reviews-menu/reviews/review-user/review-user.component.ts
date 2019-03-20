import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'app/user/shops/shops.model';
import { SocialUser, AuthService } from 'angularx-social-login';
import { Review } from 'app/user/reviews/reviews.model';
import { ReviewsService } from 'app/user/reviews/reviews.service';
import { MatDialog } from '@angular/material';
import { ReviewsDialog } from 'app/user/food-estab/reviews-menu/reviews/reviews.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AddRatingReviewDialog, AddedReview } from 'app/user/food-estab/add-rating-review/add-rating-review.component';

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
  addReviewFormGroup: FormGroup;

  public user: SocialUser;
  public loggedIn: boolean;

  reviews: Review[] = [];

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
    this.reviewService.getReviewsByNewest(this.shop.fe_id).subscribe((reviews) => {
      this.reviews = reviews.filter(_review => {
        return _review.user_id == this.user.id;
      })
    });
    this.addReviewFormGroup = this.formBuilder.group({
      rating: new FormControl(),
      review: new FormControl()
    });
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
      if (result.rating && result.review) {
        this.reviewService.editReviewByShopid(this.shop.fe_id, result.rating, result.review)
      }
    })
  }
}
