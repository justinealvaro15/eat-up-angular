import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../users.service';
import { HttpClientModule }    from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User } from '../user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] =[];
  allUsers:User[] = [];
  getFilteredUserSubscription: Subscription;
  getUsersSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit() {

    this.getUsersSubscription = this.usersService.getUsersDisplay().subscribe((users) => { //For Initialization
       this.getFilteredUsers();
    });
    this.getFilteredUserSubscription = this.usersService.filterChanged.subscribe((filter) => { 
      this.getFilteredUsers();
      console.log(filter);
     
    })
    this.getFilteredUsers();
  }

  ngOnDestroy() {
    try {
      this.getFilteredUserSubscription.unsubscribe();
      this.getUsersSubscription.unsubscribe();
    } catch { }
  }

  getFilteredUsers() {
    this.users = this.usersService.getFilteredUsers();
  }

  makeAdmin():void {
    const dialogRef = this.dialog.open(MakeAdminDialog, {
      width: '350px',
      // data: {
      //   foodGroups: this.foodGroups,
      //   foodGroupControl: this.foodGroupControl,
      //   addFoodFormGroup: this.addFoodFormGroup,
      // }
    });

    // dialogRef.afterClosed().subscribe((result: AddedMenu) => {
    //   if (result.group && result.type) {
    //     const newMenu: Consumables | BrandedConsumables = {
    //       c_name: result.name,
    //       price: result.price,
    //       c_avg_rating: 0,
    //       amount: result.amount,
    //     };
    //     this.shop[result.group][result.type].push(newMenu);

    //     this.shopService.addFoodOrBeverageByShopId(this.shop.fe_id, result);
    //   }
    // });
  }
  deacUser():void {
    const dialogRef = this.dialog.open(DeacUserDialog, {
      width: '350px',
      // data: {
      //   foodGroups: this.foodGroups,
      //   foodGroupControl: this.foodGroupControl,
      //   addFoodFormGroup: this.addFoodFormGroup,
      // }
    });

    // dialogRef.afterClosed().subscribe((result: AddedMenu) => {
    //   if (result.group && result.type) {
    //     const newMenu: Consumables | BrandedConsumables = {
    //       c_name: result.name,
    //       price: result.price,
    //       c_avg_rating: 0,
    //       amount: result.amount,
    //     };
    //     this.shop[result.group][result.type].push(newMenu);

    //     this.shopService.addFoodOrBeverageByShopId(this.shop.fe_id, result);
    //   }
    // });
  }
}

@Component ({
  selector: 'make-admin-dialog',
  templateUrl: 'make-admin-dialog.html'
})

export class MakeAdminDialog {
  size = 12;
  width1 = 250;
  width2 = 100;
  height = 100;

  constructor (
    public dialogRef: MatDialogRef<MakeAdminDialog>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {

  }
}

@Component ({
  selector: 'deac-user-dialog',
  templateUrl: 'deac-user-dialog.html'
})

export class DeacUserDialog {
  size = 12;
  width1 = 250;
  width2 = 100;
  height = 100;

  constructor (
    public dialogRef: MatDialogRef<DeacUserDialog>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {

  }
}

/*
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

*/