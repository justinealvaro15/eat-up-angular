import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { User, Admin } from '../../users/user.model';
import { UsersService, FilterKeys } from '../../users/users.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit {
  getFilteredAdminsSubscription: Subscription;
  getAdminsSubscription: Subscription;
  filter: FormGroup;
  admins : Admin[]=[];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.filter = this.fb.group({
      name_or_id: new FormControl(this.usersService.filter.name_or_id)
    });
    this.getFilteredAdminsSubscription = this.usersService.getAdminsDisplay().subscribe((admins) => { //For Initialization
       this.getFilteredAdmins();
    });
    this.getAdminsSubscription = this.usersService.filterChanged.subscribe((filter) => { 
      this.getFilteredAdmins();
     
    })
    this.getFilteredAdmins();
  }

  ngOnDestroy() {
    try {
      this.getFilteredAdminsSubscription.unsubscribe();
      this.getAdminsSubscription.unsubscribe();
    } catch { }
  }

  getFilteredAdmins() {
    this.admins = this.usersService.getFilteredAdmins();
  }

  deacAdmin(admin: Admin): void {
      const dialogRef = this.dialog.open(DeacAdminDialog, {
        width: '350px',
        data: {
            user_id: admin.user_id,
            first_name: admin.first_name,
            last_name: admin.last_name
        }
      });
  
      
       dialogRef.afterClosed().subscribe((result: any) => {
            this.usersService.deactivateAdmin(result);
            this.usersService.isAdminStatusToFalse(result);
            window.location.reload();
       });
  }
}

@Component ({
  selector: 'deac-admin-dialog',
  templateUrl: 'deac-admin-dialog.html'
})

export class DeacAdminDialog {
  size = 12;
  width1 = 250;
  width2 = 100;
  height = 100;

  constructor (
    public dialogRef: MatDialogRef<DeacAdminDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Admin
  ) {}

  onNoClick(): void { 
    this.dialogRef.close();
  }

  onYesClick(): any { 
    return { 
      user_id: this.data.user_id,
    }
  }
}