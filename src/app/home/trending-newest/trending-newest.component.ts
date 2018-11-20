import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { ShopsService } from 'src/app/shops/shops.service';
import { Shop } from 'src/app/shops/shops.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trending-newest',
  templateUrl: './trending-newest.component.html',
  styleUrls: ['./trending-newest.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrendingNewestComponent implements OnInit, OnDestroy {
  newestShops: Shop[];
  trendingShops: Shop[];
  subscriptions: Subscription[] = [];


  constructor(
    private shopService: ShopsService
    ) { }

  ngOnInit() {
    this.subscriptions.push(this.shopService.getShopByNewest().subscribe((shops) => {
      this.newestShops = shops;
    }));
    this.subscriptions.push(this.shopService.getShopByRating().subscribe((shops) => {
      this.trendingShops = shops;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      try {
        subscription.unsubscribe();
      } catch { }
    })
  }

}
