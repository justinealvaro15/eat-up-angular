import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SocialUser } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

export interface DialogData {
  foodGroup: FoodGroup[];
  foodGroupControl: FormControl;
}

export interface Category {
  value: string;
  viewValue: string;
}

export interface FoodGroup {
  disabled?: boolean;
  name: string;
  category: Category[];
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-add-menu-item',
  templateUrl: 'add-menu-item.component.html',
  styleUrls: ['add-menu-item.component.css'],
})
export class AddMenuItemComponent {
  foodGroupControl = new FormControl();
  foodGroups: FoodGroup[] = [
    {
      name: 'Food',
      category: [
        {value: 'meal-0', viewValue: 'Meals'},
        {value: 'meryenda-1', viewValue: 'Meryenda'},
        {value: 'sandwich-2', viewValue: 'Sandwiches'},
        {value: 'pasta-noodles-3', viewValue: 'Pasta/Noodles'},
        {value: 'sweets-4', viewValue: 'Sweets'},
        {value: 'street-food-5', viewValue: 'Street Foods'},
        {value: 'branded-food-6', viewValue: 'Branded Foods'}
      ]
    },
    {
      name: 'Beverages',
      category: [
        {value: 'inhouse-7', viewValue: 'In-House'},
        {value: 'branded-bev-8', viewValue: 'Branded Beverages'}
      ]
    }
  ];

  animal: string;
  name: string;
  user:SocialUser;
  loggedIn: boolean;

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit () {
      this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMenuItemDialog, {
      width: '350px',
      data: {
        foodGroups: this.foodGroups,
        foodGroupControl: this.foodGroupControl
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}

@Component({
  selector: 'add-menu-item-dialog',
  templateUrl: 'add-menu-item-dialog.html',
})
export class AddMenuItemDialog{
  size = 12;
  width1 = 250;
  width2 = 100;
  height = 100;

  constructor(
    public dialogRef: MatDialogRef<AddMenuItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */