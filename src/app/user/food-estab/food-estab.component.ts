import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Shop } from '../shops/shops.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShopsService } from '../shops/shops.service';
import * as moment from 'moment';

@Component({
  selector: 'app-food-estab',
  templateUrl: './food-estab.component.html',
  styleUrls: ['./food-estab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FoodEstabComponent implements OnInit, OnDestroy {
  shop: Shop;
  shopSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopsService
  ) { }

  ngOnInit() {
    const shopId = this.route.snapshot.paramMap.get('shopId');

    this.shopSubscription = this.shopService.getShopById(shopId).subscribe(shop => this.shop = shop);
  }

  ngOnDestroy() {
    try {
      this.shopSubscription.unsubscribe()
    } catch { }
  }

  isShopOpen(): boolean {
    const opening = moment().hour(this.shop.hours.opening.hour).minute(this.shop.hours.opening.minute);
    const closing = moment().hour(this.shop.hours.closing.hour).minute(this.shop.hours.closing.minute);
    const currentDate = moment();

    const isOpenToday = this.shop.days_open.map(day => day.toLowerCase()).includes(currentDate.format('dddd').toLowerCase());
    
    const isOpenThisTime = currentDate.isSameOrAfter(opening) && currentDate.isSameOrBefore(closing);

    return isOpenToday && isOpenThisTime;
  }
}
