import { Component, OnInit } from '@angular/core';
import { Shop } from 'app/user/shops/shops.model';
import * as moment from 'moment';
import { MapDialog } from 'app/user/food-estab/food-estab.component';
import { ActivatedRoute } from '@angular/router';
import { ShopsService } from 'app/user/shops/shops.service';
import { ReviewsService } from 'app/user/reviews/reviews.service';
import { MatDialog } from '@angular/material';
import { Review } from 'app/user/reviews/reviews.model';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddShopDialog, SHOP_TYPE, AddedShop } from '../food-establishments.component';
import { LoadingService } from 'app/loading.service';

@Component({
  selector: 'app-admin-food-estab',
  templateUrl: './admin-food-estab.component.html',
  styleUrls: ['./admin-food-estab.component.scss']
})
export class AdminFoodEstabComponent implements OnInit {
  shop: Shop;
  shopSubscription: Subscription;
  reviews: Review[] = [];
  days_week: string[] = ["Su", "M", "T", "W", "Th", "F", "Sa"];
  opening_hour: string;
  opening_mins: string;
  closing_hour: string;
  closing_mins: string;

  addShopFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopsService,
    private reviewService: ReviewsService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    const shopId = this.route.snapshot.paramMap.get('shopId');
    this.shopSubscription = this.shopService.getShopById(shopId).subscribe(shop => this.shop = shop);
    this.reviewService.getReviewsByNewest(shopId).subscribe((reviews) => {
      this.reviews = reviews;
    });
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
      image: null
    });
  }

  openShop(shop: Shop) {
    const opening_hours = shop.hours.opening.hour.toString() + ":" + shop.hours.opening.minute.toString();
    const closing_hours = shop.hours.closing.hour.toString() + ":" + shop.hours.closing.minute.toString();
    this.addShopFormGroup.get('opening_hours').setValue(opening_hours);
    this.addShopFormGroup.get('closing_hours').setValue(closing_hours);

    const days_openForm = <FormArray>this.addShopFormGroup.get('days_open');
    while (days_openForm.length !== 0) {
      days_openForm.removeAt(0)
    }
    shop.days_open.forEach((dayOpen) => days_openForm.push(new FormControl(dayOpen)));

    const NearBuildings = shop.Nearest_Bldgs.map((nearBuilding) => {
      return String(nearBuilding.id)
    });
    this.addShopFormGroup.get('NearBuildings').setValue(NearBuildings);

    const AddtlDetails: any[] = [];
    if(shop.FreeWater === "Yes") {
      AddtlDetails.push('1');
    }

    if(shop.BYOBIncentive === "Yes") {
      AddtlDetails.push('2');
    }

    if(shop.CLAYGO === "Yes") {
      AddtlDetails.push('3');
    }
    this.addShopFormGroup.get('AddtlDetails').setValue(AddtlDetails);

    this.addShopFormGroup.get('fe_name').setValue(shop.fe_name);
    this.addShopFormGroup.get('type').setValue(SHOP_TYPE.find(shopType => shop.type === shopType));
    this.addShopFormGroup.get('address').setValue(shop.address);
    this.addShopFormGroup.get('long').setValue(shop.coordinates.long);
    this.addShopFormGroup.get('lat').setValue(shop.coordinates.lat);
    this.addShopFormGroup.get('contact_person').setValue(shop.contact_person);
    this.addShopFormGroup.get('contact_number').setValue(shop.contact_number);
    this.addShopFormGroup.get('ExtraRice').setValue(shop.ExtraRice);
    this.addShopFormGroup.get('AddlTakeOutCost').setValue(shop.AddlTakeOutCost);
    this.addShopFormGroup.get('SeatingCapacity').setValue(shop.SeatingCapacity);
    // this.addShopFormGroup.get('image').setValue(shop.image);

    const dialogRef = this.dialog.open(AddShopDialog, {
      width: '350px',
      data: {
        addShopFormGroup: this.addShopFormGroup,
        isEdit: true
      }
    });

    dialogRef.afterClosed().subscribe((result: AddedShop) => {
      shop.fe_name = result.fe_name;
      shop.type = result.type;
      shop.address = result.address;
      shop.coordinates.long = result.long;
      shop.coordinates.lat = result.lat;
      shop.contact_person = result.contact_person;
      shop.contact_number = result.contact_number;
      shop.hours.opening.hour = result.hours.opening.hour;
      shop.hours.opening.minute = result.hours.opening.minute;
      shop.hours.closing.hour = result.hours.closing.hour;
      shop.hours.closing.minute = result.hours.closing.minute;
      shop.days_open = result.days_open;
      shop.AddlTakeOutCost = result.AddlTakeOutCost;
      shop.FreeWater = result.FreeWater;
      shop.BYOBIncentive = result.BYOBIncentive;
      shop.SeatingCapacity = result.SeatingCapacity;
      shop.CLAYGO = result.CLAYGO;
      shop.Nearest_Bldgs = result.NearBuildings;

      this.shopService.editFoodEstablishment(this.shop.fe_id, result);
    });
  }

  deactivateFoodEstablishment() {
    this.shop.active = !this.shop.active;
    console.log(this.shop.active);
    this.shopService.deactivateFoodEstablishment(this.shop.fe_id, this.shop.active);
  }

  setOpeningHour(shop:Shop) {
    //setting hours
    if (this.shop.hours.opening.hour > 12) {
      return this.opening_hour = String(this.shop.hours.opening.hour - 12);
    } else {
      return this.opening_hour = String(this.shop.hours.opening.hour);
    }
  }

  setOpeningMins(shop:Shop) {
    //setting minutes
    if (String(this.shop.hours.opening.minute).length==1) {
      return this.opening_mins = "0" + String(this.shop.hours.opening.minute);
    } else {
      return this.opening_mins = String(this.shop.hours.opening.minute);
    }
  }

  setClosingHour(shop:Shop){
    if (this.shop.hours.closing.hour > 12) {
      return this.closing_hour = String(this.shop.hours.closing.hour - 12);
    } else {
      return this.closing_hour = String(this.shop.hours.closing.hour);
    }    
  }

  setClosingMins(shop:Shop) {
    if (String(this.shop.hours.closing.minute).length==1) {
      return this.closing_mins = "0" + String(this.shop.hours.closing.minute);
    } else {
      return this.closing_mins = String(this.shop.hours.closing.minute);
    }  
  }

  ngOnDestroy() {
    try {
      this.shopSubscription.unsubscribe();
    } catch { }
  }

  showMap():void {
    const dialogRef = this.dialog.open(MapDialog, {
      width: '340px',
      data: {
        shop: this.shop
      }
    });
  }

  isShopOpen(): boolean {
    const opening = moment().hour(this.shop.hours.opening.hour).minute(this.shop.hours.opening.minute);
    const closing = moment().hour(this.shop.hours.closing.hour).minute(this.shop.hours.closing.minute);
    const currentDate = moment();

    const isOpenToday = this.shop.days_open.map(day => day.toLowerCase()).includes(currentDate.format('dddd').toLowerCase());
    
    const isOpenThisTime = currentDate.isSameOrAfter(opening) && currentDate.isSameOrBefore(closing);

    return isOpenToday && isOpenThisTime;
  }

  isShopOpenDay(day: string): boolean {
    if(day == "Su"){
      return this.shop.days_open.indexOf("Sunday") !== -1;
    } else if(day == "M"){
      return this.shop.days_open.indexOf("Monday") !== -1;
    } else if(day == "T"){
      return this.shop.days_open.indexOf("Tuesday") !== -1;
    } else if(day == "W"){
      return this.shop.days_open.indexOf("Wednesday") !== -1;
    } else if(day == "Th"){
      return this.shop.days_open.indexOf("Thursday") !== -1;
    } else if(day == "F"){
      return this.shop.days_open.indexOf("Friday") !== -1;
    } else if(day == "Sa"){
      return this.shop.days_open.indexOf("Saturday") !== -1;
    }
  }

  getShopPercentRating() {
    const ratingInPercent = (this.shop.fe_avg_rating/5*100);
    return `${ratingInPercent}%`;
  }
}
