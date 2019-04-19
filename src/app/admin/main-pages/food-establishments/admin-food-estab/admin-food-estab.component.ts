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
