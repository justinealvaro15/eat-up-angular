import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService, FilterKeys } from '../users.service';
import { HttpClientModule }    from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User, Admin } from '../user.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] =[];
  allUsers:User[] = [];
  admins : Admin[]=[];
  getFilteredUserSubscription: Subscription;
  getUsersSubscription: Subscription;
  filter: FormGroup;


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.filter = this.fb.group({
      name_or_email: new FormControl(this.usersService.filter.name_or_email)
    });
    this.getUsersSubscription = this.usersService.getUsersDisplay().subscribe((users) => { //For Initialization
       this.getFilteredUsers();
    });
    this.getFilteredUserSubscription = this.usersService.filterChanged.subscribe((filter) => { 
      this.getFilteredUsers();
     
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

  makeAdmin(user: User):void {
   
    const dialogRef = this.dialog.open(MakeAdminDialog, {
      width: '350px',
      data: {
          email: user.email,
          name: user.name
          //photoUrl:
      }
    });

    dialogRef.afterClosed().subscribe((result: Admin) => {
      const date = new Date();
       if (result.email && result.name) {
         const newAdmin: Admin = {
           email: result.email,
           name: result.name,
           admin_since: {
             year: date.getFullYear(),
             month: date.getMonth(),
             day: date.getDate(),
             hour: date.getHours(),
             minute: date.getMinutes(),
             second: date.getSeconds()
           }
           //photoUrl:
         };
         this.usersService.setFilter(FilterKeys.Name_Or_Email,user.email);
         if (!this.usersService.alreadyAdmin()) {
           this.usersService.addAdmin(newAdmin); //do only if not already in db
           window.alert(result.name + " is now an Admin"); 
         } else {
           window.alert(result.name + " is already an Admin");
         }
         this.usersService.setFilter(FilterKeys.Name_Or_Email,"");
       
         
        }
    });
  }

  deacUser(user: User):void {
    //needs to change user status from active to inactive
    const dialogRef = this.dialog.open(DeacUserDialog, {
      width: '350px',
      data: {
          email: user.email
      }
    });

    
     dialogRef.afterClosed().subscribe((result: any) => {
          this.usersService.deactivateUser(result);
     });
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
    @Inject(MAT_DIALOG_DATA) public data: Admin
  ) {}

  onNoClick(): void { //on remove as admin
    this.dialogRef.close();
  }

  onYesClick(): any { //on make admin
    return { 
      email: this.data.email,
      name: this.data.name
    }
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
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  onNoClick(): void {  //or on activate user
    // return {
    //   email : this.data.email,
    //   status: "activate"
    // }
    this.dialogRef.close();
  }

  onYesClick() { //or on deactivate user
    return {
      email : this.data.email,
      status: "deactivate"
    }
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