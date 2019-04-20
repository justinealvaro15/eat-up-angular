import { Component, OnInit, Input, Inject } from '@angular/core';
import { Shop, Consumables, BrandedConsumables } from 'app/user/shops/shops.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FoodGroup, FoodBeveragesMapping, AddedMenu } from 'app/user/food-estab/food-group';
import { SocialUser, AuthService } from 'angularx-social-login';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShopsService } from 'app/user/shops/shops.service';

export interface DialogData {
  foodGroup: FoodGroup[];
  foodGroupControl: FormControl;
  addFoodFormGroup: FormGroup;
  isEdit?: boolean;
}

@Component({
  selector: 'app-admin-add-menu-item',
  templateUrl: './admin-add-menu-item.component.html',
  styleUrls: ['./admin-add-menu-item.component.scss']
})
export class AdminAddMenuItemComponent implements OnInit {
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
    private shopService: ShopsService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.addFoodFormGroup = this.formBuilder.group({
      foodCategoryAndType: new FormControl(),
      name: new FormControl(),
      price: new FormControl(),
      amount: new FormControl()
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminAddMenuItemDialog, {
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
        };
        this.shop[result.group][result.type].push(newMenu);

        this.shopService.addFoodOrBeverageByShopId(this.shop.fe_id, result);
        window.alert("Food Item Added");
      }
    });
  }

  alertUser() {
    window.alert("Please sign-in with your UP Mail to use this feature.");
  }
}

@Component({
  selector: 'admin-add-menu-item-dialog',
  templateUrl: 'admin-add-menu-item-dialog.html',
})
export class AdminAddMenuItemDialog {
  size = 12;
  width1 = 250;
  width2 = 100;
  height = 100;

  constructor(
    public dialogRef: MatDialogRef<AdminAddMenuItemDialog>,
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