import { Component, OnInit, Input } from '@angular/core';
import { Shop } from './../../shops/shops.model';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent implements OnInit {
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  @Input() shop: Shop;


  goToShop(shopId: string) {
    this.router.navigate(['/eat-up/user/shops', shopId]);
  }

  isShopOpen(): boolean {
    const opening = moment().hour(this.shop.hours.opening.hour).minute(this.shop.hours.opening.minute);
    const closing = moment().hour(this.shop.hours.closing.hour).minute(this.shop.hours.closing.minute);
    const currentDate = moment();

    const isOpenToday = this.shop.days_open.map(day => day.toLowerCase()).includes(currentDate.format('dddd').toLowerCase());
    
    const isOpenThisTime = currentDate.isSameOrAfter(opening) && currentDate.isSameOrBefore(closing);

    return isOpenToday && isOpenThisTime;
  }

  getShopPercentRating() {
    const ratingInPercent = this.shop.fe_avg_rating/5*100;
    return `${ratingInPercent}%`;
  }
}
