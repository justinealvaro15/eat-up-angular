import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject } from '@angular/core';
import { Shop } from '../shops/shops.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShopsService } from '../shops/shops.service';
import * as moment from 'moment';
import { ReviewsService } from '../reviews/reviews.service';
import { Review } from '../reviews/reviews.model';
import { MapComponent } from './map/map.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-food-estab',
  templateUrl: './food-estab.component.html',
  styleUrls: ['./food-estab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FoodEstabComponent implements OnInit, OnDestroy {
  shop: Shop;
  shopSubscription: Subscription;
  reviews: Review[] = [];
  days_week: string[] = ["Su", "M", "T", "W", "Th", "F", "Sa"];

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopsService,
    private reviewService: ReviewsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    const shopId = this.route.snapshot.paramMap.get('shopId');
    this.shopSubscription = this.shopService.getShopById(shopId).subscribe(shop => this.shop = shop);
    this.reviewService.getReviewsByNewest(shopId).subscribe((reviews) => {
      this.reviews = reviews;
    });
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
}

@Component ({
  selector: 'map-dialog',
  templateUrl: 'map-dialog.html'
})

export class MapDialog {
  size = 12;
  width1 = 250;
  width2 = 100;
  height = 100;
  shop: Shop;
  constructor (
    public dialogRef: MatDialogRef<MapDialog>,
    @Inject(MAT_DIALOG_DATA) public map_data: MapDialog
  ) {
    this.shop = map_data.shop;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}

