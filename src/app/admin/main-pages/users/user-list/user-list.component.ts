import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService, FilterKeys } from '../users.service';
import { HttpClientModule }    from '@angular/common/http';
import { Subscription } from 'rxjs';
import { User, Admin } from '../user.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

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
  is_admin: true;
  is_not_admin: false;


  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private usersService: UsersService,
    
  ) { }

  ngOnInit() {
    this.filter = this.fb.group({
      name_or_id: new FormControl(this.usersService.filter.name_or_id)
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

  isAdmin(user:User): boolean {
    if (user.isAdmin==true) {
      return this.is_admin;
    } else if (user.isAdmin==false){
      return this.is_not_admin;
    }
  }

  makeAdmin(user: User):void {
   
    const dialogRef = this.dialog.open(MakeAdminDialog, {
      width: '350px',
      data: {
          user_id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name
          //photoUrl:
      }
    });

    dialogRef.afterClosed().subscribe((result: Admin) => {
      const date = new Date();
       if (result.user_id && result.first_name&&result.last_name) {
         const newAdmin: Admin = {
           user_id: result.user_id,
           first_name: result.first_name,
           last_name: result.last_name,
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
        
        this.usersService.addAdmin(newAdmin);
        this.usersService.isAdminStatusToTrue(newAdmin);
        window.alert(result.first_name + " is now an Admin"); 
        window.location.reload();
         
        }
    });
  }

  acUser(user:User) : void {
      const dialogRef = this.dialog.open(AcUserDialog, {
        width: '350px',
        data: {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name:user.last_name,
            active: user.active
        }
      });

      
      dialogRef.afterClosed().subscribe((result: any) => {
            this.usersService.activateUser(result);
            window.location.reload();
      });
  }

  deacUser(user: User):void {
    //needs to change user status from active to inactive
    if (!user.isAdmin) {
      const dialogRef = this.dialog.open(DeacUserDialog, {
        width: '350px',
        data: {
            user_id: user.user_id,
            first_name: user.first_name,
            last_name:user.last_name,
            active: user.active
        }
      });
  
      
       dialogRef.afterClosed().subscribe((result: any) => {
            this.usersService.deactivateUser(result);
            window.location.reload();
       });
    } else {
      window.alert('Remove ' + user.first_name + " " + user.last_name+" as Admin before deactivating as a user.");
    }
    
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
      user_id: this.data.user_id,
      first_name: this.data.first_name,
      last_name: this.data.last_name
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
  private user: SocialUser;
  public loggedIn: boolean;

  constructor (
    public dialogRef: MatDialogRef<DeacUserDialog>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

    ngOnInit() {
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
      });
    }

  onNoClick(): void {  //or on activate user
    // return {
    //   email : this.data.email,
    //   status: "activate"
    // }
    this.dialogRef.close();
  }

  onYesClick() { //or on deactivate user
    const date = new Date();
    console.log("deac yes");
    return {
      user_id : this.data.user_id,
      first_name: this.data.first_name,
      last_name:this.data.last_name,
      deactivated: {
        deactivated_by: this.user.firstName + " " + this.user.lastName,
        deactivated_on: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds()
        } 
      },
      active: this.data.active

    }
  }
}

@Component ({
  selector: 'ac-user-dialog',
  templateUrl: 'ac-user-dialog.html'
})

export class AcUserDialog {
  size = 12;
  width1 = 250;
  width2 = 100;
  height = 100;

  constructor (
    public dialogRef: MatDialogRef<AcUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  onNoClick(): void {  
    this.dialogRef.close();
  }

  onYesClick() {
    return {
      user_id : this.data.user_id,
      first_name: this.data.first_name,
      last_name:this.data.last_name,
      deactivated: {
        deactivated_by: null,
        deactivated_on: {
          year: null,
          month: null,
          day: null,
          hour: null,
          minute: null,
          second:null
        }
      },
      active: this.data.active
    }
  }
}
