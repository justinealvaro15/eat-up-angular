import { Component, OnInit, Input } from '@angular/core';
import { Consumables, BrandedConsumables, Shop } from 'app/user/shops/shops.model';
import { MatDialog } from '@angular/material';
import { AddMenuItemDialog } from 'app/user/food-estab/add-menu-item/add-menu-item.component';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ShopsService } from 'app/user/shops/shops.service';
// import { AuthService } from 'app/user/auth.service';
import { SocialUser, AuthService } from 'angularx-social-login';
import { FoodGrouping, FoodGroup, AddedMenu, FoodBeveragesMapping } from 'app/user/food-estab/food-group';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
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
    })
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
    console.log(consumable instanceof BrandedConsumables);
    if (consumable.amount) { 
      this.addFoodFormGroup.get('amount').setValue(consumable.amount);
    }

    const dialogRef = this.dialog.open(AddMenuItemDialog, {
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
          user_id: this.user.id,
          username: this.user.name,
          active: this.shop[result.group][result.type][index].active
        };
        if (result.amount) {
          newMenu.amount = result.amount;
        }

        this.shop[result.group][result.type][index] = newMenu;

        this.shopService.editFoodOrBeverageByShopid(this.shop.fe_id, result.group, result.type, this.shop[result.group][result.type]);
        window.alert(newMenu.c_name + " updated!");
      }
    });
  }

}
