import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShopsService } from 'app/user/shops/shops.service';

export interface AddedShop {
  fe_name: string,
  type: string,
  address: string,
  lat: number,
  long: number,
  contact_person: string,
  contact_number: string,
  // hours:{
  //     opening: {
  //         hour: number,
  //         minute: number
  //     },
  //     closing: {
  //         hour: number,
  //         minute: number
  //     };
  // };
  days_open: string[],
  AddlTakeOutCost: string,
  FreeWater: string,
  BYOBIncentive: string,
  SeatingCapacity: string | number,
  CLAYGO: string
}

export interface DialogData {
  addShopFormGroup: FormGroup;
}

@Component({
  selector: 'app-food-establishments',
  templateUrl: './food-establishments.component.html',
  styleUrls: ['./food-establishments.component.scss']
})
export class FoodEstablishmentsComponent implements OnInit {
  addShopFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private shopService: ShopsService
  ) { }

  ngOnInit() {
    this.addShopFormGroup = this.formBuilder.group({
      fe_name: new FormControl(),
      type: new FormControl(),
      address: new FormControl(),
      // coordinates: new FormControl(),
      long: new FormControl(),
      lat: new FormControl(),
      contact_person: new FormControl(),
      contact_number: new FormControl(),
      // opening_hour
      days_open: new FormControl(),
      AddlTakeOutCost: new FormControl(),
      FreeWater: new FormControl(),
      BYOBIncentive: new FormControl(),
      SeatingCapacity: new FormControl(),
      CLAYGO: new FormControl()
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddShopDialog, {
      width: '350px',
      data: {
        addShopFormGroup: this.addShopFormGroup
      }
    });

    // dialogRef.afterClosed().
  }
}

@Component({
  selector: 'add-shop-dialog',
  templateUrl: 'add-shop-dialog.html'
})
export class AddShopDialog {
  // size = 12;
  // width1 = 250;
  // width2 = 100;
  // height = 100;

  constructor(
    public dialogRef: MatDialogRef<AddShopDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAddedShop(): AddedShop {
    const addShopFormGroup = this.data.addShopFormGroup;

    return {
      fe_name: addShopFormGroup.get('fe_name').value,
      type: addShopFormGroup.get('type').value,
      address: addShopFormGroup.get('address').value,
      long: addShopFormGroup.get('long').value,
      lat: addShopFormGroup.get('lat').value,
      contact_person: addShopFormGroup.get('contact_person').value,
      contact_number: addShopFormGroup.get('contact_number').value,
      // opening_hour
      days_open: addShopFormGroup.get('days_open').value,
      AddlTakeOutCost: addShopFormGroup.get('AddlTakeOutCost').value,
      FreeWater: addShopFormGroup.get('FreeWater').value,
      BYOBIncentive: addShopFormGroup.get('BYOBIncentive').value,
      SeatingCapacity: addShopFormGroup.get('SeatingCapacity').value,
      CLAYGO: addShopFormGroup.get('CLAYGO').value
    }
  } 
}