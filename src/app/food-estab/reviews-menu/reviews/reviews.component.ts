import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData { //sample data for reference for server later
  animal: 'panda' | 'unicorn' | 'lion';
}

/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'display-reviews',
  templateUrl: 'reviews.component.html',
  styleUrls: ['reviews.component.css'],
})
export class ReviewsComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ReviewsDialog, {
      data: { //sample data for reference for server later
        animal: 'panda'
      }
    });
  }
}

@Component({
  selector: 'reviews-dialog',
  templateUrl: 'reviews-dialog.component.html',
})
export class ReviewsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
