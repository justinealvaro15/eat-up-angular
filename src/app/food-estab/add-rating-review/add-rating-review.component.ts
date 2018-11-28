import {Component, Inject,ViewEncapsulation} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  rating:number;
  review: string;
  shopName: string;
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
  rating: number;
  review: string;
  shopName: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRatingReviewDialog, {
      width: '500px',
      data: {shopName: this.shopName, rating:this.rating, review: this.review}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.review = result;
    });

    
  }
 
}


@Component({
  selector: 'add-rating-review-dialog',
  templateUrl: 'add-rating-review-dialog.html',
})
export class AddRatingReviewDialog {

  constructor(
    public dialogRef: MatDialogRef<AddRatingReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

