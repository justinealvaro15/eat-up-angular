import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SocialUser, AuthService } from "angularx-social-login";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Shop, Consumables, BrandedConsumables } from './../../../user/shops/shops.model';
import { ShopsService } from './../../../user/shops/shops.service';
import { FoodGroup, AddedMenu, FoodBeveragesMapping } from '../food-group';

export interface DialogData {
  foodGroups: FoodGroup[];
  foodGroupControl: FormControl;
  addFoodFormGroup: FormGroup;
  isEdit?: boolean;
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
  @Input() shop: Shop;
  foodGroupControl = new FormControl();
  addFoodFormGroup: FormGroup;
  foodGroups: FoodGroup[] = [
    {
      name: 'Food',
      category: [
        { value: FoodBeveragesMapping.meals, viewValue: 'Meals' },
        { value: FoodBeveragesMapping.meryenda, viewValue: 'Meryenda' },
        { value: FoodBeveragesMapping.sandwiches, viewValue: 'Sandwiches' },
        { value: FoodBeveragesMapping.pastaNoodles, viewValue: 'Pasta/Noodles' },
        { value: FoodBeveragesMapping.sweets, viewValue: 'Sweets' },
        { value: FoodBeveragesMapping.streetFoods, viewValue: 'Street Foods' },
        { value: FoodBeveragesMapping.brandedFood, viewValue: 'Branded Foods' }
      ]
    },
    {
      name: 'Beverages',
      category: [
        { value: FoodBeveragesMapping.inHouseBeverage, viewValue: 'In-House' },
        { value: FoodBeveragesMapping.brandedBeverage, viewValue: 'Branded Beverages '}
      ]
    }
  ];

  public user: SocialUser;
  public loggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthService,
    private shopService: ShopsService) {}

  ngOnInit () {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.addFoodFormGroup = this.formBuilder.group({
      foodCategoryAndType: new FormControl(),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required])
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMenuItemDialog, {
      width: '350px',
      data: {
        foodGroups: this.foodGroups,
        foodGroupControl: this.foodGroupControl,
        addFoodFormGroup: this.addFoodFormGroup,
      }
    });

    dialogRef.afterClosed().subscribe((result: AddedMenu) => {
      if (result && result.group && result.type) {
        const newMenu: Consumables | BrandedConsumables = {
          c_name: result.name,
          price: result.price,
          c_avg_rating: 0,
          amount: result.amount,
          active: true
        };
        console.log(result.group);

        if(result.group == "Beverages") {
          if(this.shop[result.group][result.type].findIndex(x => x.c_name == result.name && x.amount == result.amount) < 0) {
            this.shop[result.group][result.type].push(newMenu);
            this.shopService.addFoodOrBeverageByShopId(this.shop.fe_id, result);
            window.alert("Food Item Added");
          } else {
            window.alert(result.name + " already exists.");
          }
        } else if (result.group == "Food") {
          if(this.shop[result.group][result.type].findIndex(x => x.c_name == result.name) < 0) {
            this.shop[result.group][result.type].push(newMenu);
            this.shopService.addFoodOrBeverageByShopId(this.shop.fe_id, result);
            window.alert("Food Item Added");
          } else {
            window.alert(result.name + " already exists.");
          }
        }
        
      }
    });
  }

  alertUser() {
    window.alert("Please sign-in with your UP Mail to use this feature.");
  }
}

@Component({
  selector: 'add-menu-item-dialog',
  templateUrl: 'add-menu-item-dialog.html',
})
export class AddMenuItemDialog {
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


  getAddedMenu(): AddedMenu {
    const addFoodFormGroup = this.data.addFoodFormGroup;
    const foodCategoryAndType = addFoodFormGroup.get('foodCategoryAndType').value;

    return {
      group: foodCategoryAndType ? foodCategoryAndType.group : null,
      type: foodCategoryAndType ? foodCategoryAndType.type : null,
      name: addFoodFormGroup.get('name').value,
      price: addFoodFormGroup.get('price').value,
      amount: foodCategoryAndType ? 
        foodCategoryAndType.isBranded ? addFoodFormGroup.get('amount').value : undefined
        : undefined
    }
  }

  isBranded(): boolean {
    const addFoodFormGroup = this.data.addFoodFormGroup;
    const foodCategoryAndType = addFoodFormGroup.get('foodCategoryAndType').value;

    return foodCategoryAndType ? foodCategoryAndType.isBranded : false
  }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */