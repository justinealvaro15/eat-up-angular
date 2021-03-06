import { Component, OnInit, Input } from '@angular/core';
import { Consumables, BrandedConsumables, Shop } from 'app/user/shops/shops.model';
import { SocialUser, AuthService } from 'angularx-social-login';
import { MatDialog } from '@angular/material';
import { ShopsService } from 'app/user/shops/shops.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FoodGroup, FoodGrouping, AddedMenu } from 'app/user/food-estab/food-group';
import { AdminAddMenuItemDialog } from '../admin-add-menu-item/admin-add-menu-item.component';

@Component({
  selector: 'app-admin-menu-item',
  templateUrl: './admin-menu-item.component.html',
  styleUrls: ['./admin-menu-item.component.scss']
})
export class AdminMenuItemComponent implements OnInit {
  @Input() title: string;
  @Input() consumables: Consumables[] | BrandedConsumables[];
  @Input() shop: Shop;
  @Input() foodOrBev: string;
  @Input() type: string;
  @Input() isBranded: string;

  public user: SocialUser;
  public loggedIn: boolean;

  foodGroupControl = new FormControl();
  addFoodFormGroup: FormGroup;
  foodGroups: FoodGroup[] = FoodGrouping;

  constructor(
    private dialog: MatDialog,
    private shopService: ShopsService,
    private authService: AuthService,
    private formBuilder: FormBuilder
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

  getTooltipText(consumable: Consumables): string {
    return consumable && consumable.username ? `Last edit by: ${consumable.username}` : null;
  }

  openMenu(consumable: Consumables | BrandedConsumables, index: number) {
    
    const _FoodBev = this.foodGroups.find(categ => categ.name === this.foodOrBev);

    const foodCateg = _FoodBev.category.find(val => {
      return val.value.group === this.foodOrBev && val.value.type === this.type;
    })

    this.addFoodFormGroup.get('foodCategoryAndType').setValue(foodCateg.value);
    this.addFoodFormGroup.get('name').setValue(consumable.c_name);
    this.addFoodFormGroup.get('price').setValue(consumable.price);
    if (consumable.amount) { 
      this.addFoodFormGroup.get('amount').setValue(consumable.amount);
    }

    const dialogRef = this.dialog.open(AdminAddMenuItemDialog, {
      width: '350px',
      data: {
        foodGroups: this.foodGroups,
        foodGroupControl: this.foodGroupControl,
        addFoodFormGroup: this.addFoodFormGroup,
        isEdit: true
      }
    });

    dialogRef.afterClosed().subscribe((result: AddedMenu) => {
      if (result.group && result.type) {
        const newMenu: Consumables | BrandedConsumables = {
          c_name: result.name,
          price: result.price,
          username: this.user.name,
          active: this.shop[result.group][result.type][index].active
        };
        if (result.amount) {
          newMenu.amount = result.amount;
        }

        this.shop[result.group][result.type][index] = newMenu;

        this.shopService.editFoodOrBeverageByShopid(this.shop.fe_id, result.group, result.type, this.shop[result.group][result.type]);
        window.alert("Food item Updated!");
      }
    });
  }

  deactivateMenuItem(consumable: Consumables | BrandedConsumables, index: number) {
    const _FoodBev = this.foodGroups.find(categ => categ.name === this.foodOrBev);

    const foodCateg = _FoodBev.category.find(val => {
      return val.value.group === this.foodOrBev && val.value.type === this.type;
    })

    // console.log(foodCateg.value);

    if(consumable.active == true || consumable.active == false) {
      consumable.active = !consumable.active;
    } else {
      // if active attribute is undefined
      consumable.active = false;
    }

    const newMenu: Consumables | BrandedConsumables = {
      c_name: consumable.c_name,
      price: consumable.price,
      username: consumable.username,
      active: consumable.active
    }

    this.shop[foodCateg.value.group][foodCateg.value.type][index] = newMenu;
    // console.log(consumable.active);
    this.shopService.editFoodOrBeverageByShopid(this.shop.fe_id, foodCateg.value.group, foodCateg.value.type, this.shop[foodCateg.value.group][foodCateg.value.type]);

    var active: string;
    if(consumable.active){
      active = "activated";
    } else {
      active = "deactivated"
    }

    window.alert(consumable.c_name + " is now " + active + ".");
  }

  checkActive(consumable: Consumables | BrandedConsumables) {
    if(consumable.active == null) {
      return true;
    } else {
      return consumable.active;
    }
  }
}
