import { Component, Inject,ViewEncapsulation, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SocialUser } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
import { ReviewsService } from 'app/user/reviews/reviews.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Shop } from 'app/user/shops/shops.model';

export interface DialogData {
  addReviewFormGroup: FormGroup;
}

export interface AddedReview {
  rating: number;
  review: string;
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
  addReviewFormGroup: FormGroup;

  public user: SocialUser;
  public loggedIn: boolean;

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
    })
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
        this.reviewService.addReview(this.shop.fe_id, result);
      }
    });
  }
}


@Component({
  selector: 'add-rating-review-dialog',
  templateUrl: 'add-rating-review-dialog.html',
})
export class AddRatingReviewDialog {
  ratenum = 5;

  constructor(
    public dialogRef: MatDialogRef<AddRatingReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAddedReview(): AddedReview {
    const addReviewFormGroup = this.data.addReviewFormGroup;
    this
    return {
      rating: addReviewFormGroup.get('rating').value,
      review: addReviewFormGroup.get('review').value
    }
  }

}

