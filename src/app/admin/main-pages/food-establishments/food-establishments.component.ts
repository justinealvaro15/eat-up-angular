import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ShopsService } from 'app/user/shops/shops.service';
import { Shop } from 'app/user/shops/shops.model';
import { LocationData, Location } from 'app/user/location/location.model';
import { Subscription } from 'rxjs';

export interface AddedShop {
  fe_name: string,
  type: string,
  address: string,
  lat: number,
  long: number,
  contact_person: string,
  contact_number: string,
  hours:{
    opening: {
        hour: number,
        minute: number
    },
    closing: {
        hour: number,
        minute: number
    };
  };
  days_open: string[],
  ExtraRice: string,
  AddlTakeOutCost: string,
  FreeWater: string,
  BYOBIncentive: string,
  SeatingCapacity: string | number,
  CLAYGO: string,
  NearBuildings: Location[],
  image: any
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
  shopWithHighestId: Shop;
  highestId: string;
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private shopService: ShopsService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.shopService.getShopByHighestId().subscribe((shop) => {
      this.shopWithHighestId = shop;
      this.highestId = String(Number(this.shopWithHighestId[0].fe_id) + 1);
      this.highestId = ('000' + this.highestId).substr(-3);
    }));
    this.addShopFormGroup = this.formBuilder.group({
      fe_name: new FormControl('', [Validators.required]),
      type: new FormControl(),
      address: new FormControl('', [Validators.required]),
      long: new FormControl('', [Validators.required]),
      lat: new FormControl('', [Validators.required]),
      contact_person: new FormControl(),
      contact_number: new FormControl(),
      opening_hours: new FormControl('', [Validators.required]),
      closing_hours: new FormControl('', [Validators.required]),
      days_open: new FormArray([]),
      ExtraRice: new FormControl(),
      AddlTakeOutCost: new FormControl(),
      SeatingCapacity: new FormControl(),
      NearBuildings: new FormControl(),
      AddtlDetails: new FormControl([]),
      image: null,
      highestId: this.highestId
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddShopDialog, {
      width: '350px',
      data: {
        addShopFormGroup: this.addShopFormGroup
      }
    });

    dialogRef.afterClosed().subscribe((result: AddedShop) => {
      if (result && this.shopWithHighestId) {
        const newShop: Shop = {
          fe_id: this.highestId as string,
          fe_name: result.fe_name,
          type: result.type,
          address: result.address,
          coordinates: {
            long: result.long,
            lat: result.lat
          },
          contact_person: result.contact_person,
          contact_number: result.contact_number,
          hours: result.hours,
          days_open: result.days_open,
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
          image: result.image,
          Nearest_Bldgs: null,
          Consumables: null,
          BrandedConsumables: null
        }
        // console.log(result.NearBuildings);
        // console.log(result.hours);
        // console.log(result.days_open);

        // console.log(this.shopWithHighestId);
        console.log(newShop);
        this.shopService.addFoodEstablishment(newShop);
      }
    })
  }
}

@Component({
  selector: 'add-shop-dialog',
  templateUrl: 'add-shop-dialog.html',
  styleUrls: ['./food-establishments.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddShopDialog {
  @ViewChild('fileInput') fileInput: ElementRef;
  // size = 12;
  // width1 = 250;
  // width2 = 100;
  // height = 100;
  locationData: Location[] = LocationData;
  file: any = null;

  days = [{
    display: 'Sun',
    value: 'Sunday'
  }, {
    display: 'M',
    value: 'Monday'
  }, {
    display: 'T',
    value: 'Tuesday'
  }, {
    display: 'W',
    value: 'Wednesday'
  }, {
    display: 'Th',
    value: 'Thursday'
  }, {
    display: 'F',
    value: 'Friday'
  }, {
    display: 'Sat',
    value: 'Saturday'
  }];

  addtlDetails = [{
    display: 'Free Water',
    value: '1'
  }, {
    display: 'Bring Your Own Baon Incentive',
    value: '2'
  }, {
    display: 'CLAYGO',
    value: '3'
  }];

  constructor(
    public dialogRef: MatDialogRef<AddShopDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onDaysOpenChange(dayValue:string, isChecked: boolean) {
    const daysOpen = <FormArray>this.data.addShopFormGroup.get('days_open');
  
    if(isChecked) {
      daysOpen.push(new FormControl(dayValue));
    } else {
      let index = daysOpen.controls.findIndex(x => x.value === dayValue)
      daysOpen.removeAt(index);
    }
  }
  

  addShop() {
    if (this.data.addShopFormGroup.valid) {
      this.dialogRef.close(this.getAddedShop());
    }
  }

  getAddedShop(): AddedShop {
    const addShopFormGroup = this.data.addShopFormGroup;
    const op_hr = addShopFormGroup.get('opening_hours').value.split(":");
    const cl_hr = addShopFormGroup.get('closing_hours').value.split(":");
    const addtl = addShopFormGroup.get('AddtlDetails').value;
    var freeWater = 'No';
    var byob = 'None';
    var claygo = 'No';

    if(addtl){
      if(addtl.indexOf('1') >= 0) {
        freeWater = 'Yes';
      } 
  
      if(addtl.indexOf('2') >= 0) {
        byob = 'Yes';
      }
  
      if(addtl.indexOf('3') >= 0) {
        claygo = 'Yes'
      }
    }
    
    return {
      fe_name: addShopFormGroup.get('fe_name').value,
      type: addShopFormGroup.get('type').value,
      address: addShopFormGroup.get('address').value,
      long: addShopFormGroup.get('long').value,
      lat: addShopFormGroup.get('lat').value,
      contact_person: addShopFormGroup.get('contact_person').value,
      contact_number: addShopFormGroup.get('contact_number').value,
      hours: {
        opening: {
          hour: op_hr[0],
          minute: op_hr[1]
        },
        closing: {
          hour: cl_hr[0],
          minute: cl_hr[1]
        }
      },
      days_open: addShopFormGroup.get('days_open').value,
      ExtraRice: addShopFormGroup.get('ExtraRice').value,
      AddlTakeOutCost: addShopFormGroup.get('AddlTakeOutCost').value,
      FreeWater: freeWater,
      BYOBIncentive: byob,
      SeatingCapacity: addShopFormGroup.get('SeatingCapacity').value,
      CLAYGO: claygo,
      NearBuildings: addShopFormGroup.get('NearBuildings').value,
      image: addShopFormGroup.get('image').value
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      // reader.read
      reader.onload = (image) => {
        console.log(image);
        this.data.addShopFormGroup.get('image').setValue(reader.result)
      };
    }
  }
}