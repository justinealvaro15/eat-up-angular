import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'src/app/shops/shops.model';
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
    this.router.navigate(['/shops', shopId]);
  }

  isShopOpen(shop: Shop): boolean {
    const opening = moment().hour(shop.hours.opening.hour).minute(shop.hours.opening.minute);
    const closing = moment().hour(shop.hours.closing.hour).minute(shop.hours.closing.minute);
    const currentDate = moment();

    const isOpenToday = shop.days_open.map(day => day.toLowerCase()).includes(currentDate.format('dddd').toLowerCase());
    
    const isOpenThisTime = currentDate.isSameOrAfter(opening) && currentDate.isSameOrBefore(closing);

    return isOpenToday && isOpenThisTime;
  }

}
