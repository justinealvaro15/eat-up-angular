import { Component, Inject,ViewEncapsulation, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SocialUser } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
import { ReviewsService } from 'app/user/reviews/reviews.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Shop } from 'app/user/shops/shops.model';
import { Review } from 'app/user/reviews/reviews.model';
import * as moment from 'moment';

export interface DialogData {
  addReviewFormGroup: FormGroup;
  isEdit:boolean;
}

export interface AddedReview {
  rating: number;
  review: string;
  oldRating?: number;
}

@Component({
  selector: 'app-add-rating-review',
  templateUrl: './add-rating-review.component.html',
  styleUrls: ['./add-rating-review.component.css'],
  encapsulation: ViewEncapsulation.None
})

/**
 * @title Dialog Overview
 */

export class AddRatingReviewComponent {
  @Input() shop: Shop;
  @Input() reviews: Review[];
  addReviewFormGroup: FormGroup;

  public user: SocialUser;
  public loggedIn: boolean;

  // reviews: Review[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private reviewService: ReviewsService,
    private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.addReviewFormGroup = this.formBuilder.group({
      rating: new FormControl(),
      review: new FormControl()
    });
    // this.reviewService.getReviewsByNewest(this.shop.fe_id).subscribe((reviews) => {
    //   this.reviews = reviews;
    // });
  }

  openDialog(): void {
    this.addReviewFormGroup.get('review').setValue('');
    const dialogRef = this.dialog.open(AddRatingReviewDialog, {
      width: '500px',
      data: {
        addReviewFormGroup: this.addReviewFormGroup
      }
    });

    dialogRef.afterClosed().subscribe((result: AddedReview) => {
      if (result) {
        const newReview: Review = {
          user_id: this.user.id,
          fe_id: this.shop.fe_id,
          firstName: this.user.firstName,
          photoUrl: this.user.photoUrl,
          rating: result.rating,
          review: result.review,
          date: moment().format('lll')
        }
        let newAvgRating: number = this.shop.fe_avg_rating * this.reviews.length;
        newAvgRating += result.rating;
        newAvgRating /= (this.reviews.length+1);
        
        this.shop.fe_avg_rating = newAvgRating;

        this.reviews.push(newReview);
        this.reviewService.addReview(this.shop.fe_id, result);
        window.alert("Your review has been submitted!");
      }
    });
  }

  isEdit(): boolean {
    return !!this.reviews.find((_review) => {
      return  this.user ? _review.user_id === this.user.id : false;
    });
  }
  
  alertUser() {
    window.alert("Please sign-in with your UP Mail to use this feature.");
  }
}


@Component({
  selector: 'add-rating-review-dialog',
  templateUrl: 'add-rating-review-dialog.html',
})
export class AddRatingReviewDialog {
  ratenum = 5;
  oldRating = 0;
  isEdit: boolean;
  public user: SocialUser;
  public loggedIn: boolean;
  size: number;
  width: number;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  constructor(
    public dialogRef: MatDialogRef<AddRatingReviewDialog>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.oldRating = this.data.addReviewFormGroup.get('rating').value * 1;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAddedReview(): AddedReview {
    const addReviewFormGroup = this.data.addReviewFormGroup;

    return {
      rating: addReviewFormGroup.get('rating').value,
      review: addReviewFormGroup.get('review').value,
      oldRating: this.oldRating
    }
  }

}

