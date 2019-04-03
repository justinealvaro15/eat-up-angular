import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShopsService } from 'app/user/shops/shops.service';
import { Shop } from 'app/user/shops/shops.model';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

export interface AddedShop {
  fe_name: string,
  type: string,
  address: string,
  lat: number,
  long: number,
  contact_person: string,
  contact_number: string,
  opening_hours: string,
  closing_hours: string,
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
  ExtraRice: string,
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
  styleUrls: ['./food-establishments.component.css']
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
      opening_hours: new FormControl(),
      closing_hours: new FormControl(),
      days_open: new FormControl(),
      ExtraRice: new FormControl(),
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

    dialogRef.afterClosed().subscribe((result: AddedShop) => {
      if (result) {
        const newShop: Shop = {
          fe_id: "999",
          fe_name: result.fe_name,
          type: result.type,
          address: result.address,
          coordinates: {
            long: result.long,
            lat: result.lat
          },
          contact_person: result.contact_person,
          contact_number: result.contact_number,
          hours: null,
          days_open: null,
          AddlTakeOutCost: result.AddlTakeOutCost || "None",
          FreeWater: result.FreeWater || "No",
          BYOBIncentive: result.BYOBIncentive || "None",
          SeatingCapacity: result.BYOBIncentive || "None",
          CLAYGO: result.CLAYGO || "No",
          ExtraRice: result.ExtraRice || "None",

          fe_avg_rating: 0,
          no_of_ratings: 0,
          Food: {
            Branded: [],
            StreetFoods: [],
            Sweets: [],
            Sandwiches: [],
            PastaNoodles: [],
            Meals: [],
            Meryenda: []
          },
          Beverages: {
            Branded: [],
            InHouse: []
          },
          ComboMeal: null,
          image: null,
          Consumables: null,
          BrandedConsumables: null,
          Nearest_Bldgs: null
        }
        console.log(newShop);
      }
    })
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
      opening_hours: addShopFormGroup.get('opening_hours').value,
      closing_hours: addShopFormGroup.get('closing_hours').value,
      days_open: addShopFormGroup.get('days_open').value,
      ExtraRice: addShopFormGroup.get('ExtraRice').value,
      AddlTakeOutCost: addShopFormGroup.get('AddlTakeOutCost').value,
      FreeWater: addShopFormGroup.get('FreeWater').value,
      BYOBIncentive: addShopFormGroup.get('BYOBIncentive').value,
      SeatingCapacity: addShopFormGroup.get('SeatingCapacity').value,
      CLAYGO: addShopFormGroup.get('CLAYGO').value
    }
  } 
}