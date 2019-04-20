import { Component, OnInit,ViewEncapsulation, OnDestroy } from '@angular/core';
import { ShopsService } from './../../shops/shops.service';
import { Shop } from './../../shops/shops.model';
import { Subscription } from 'rxjs';
import { LoadingService } from 'app/loading.service';

@Component({
  selector: 'app-trending-newest',
  templateUrl: './trending-newest.component.html',
  styleUrls: ['./trending-newest.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TrendingNewestComponent implements OnInit, OnDestroy {
  newestShops: Shop[] = [];
  trendingShops: Shop[] = [];
  shops: Shop[] = []
  subscriptions: Subscription[] = [];

  constructor(
    private shopService: ShopsService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.showLoading();
    this.subscriptions.push(this.shopService.getShopByNewest().subscribe((shops) => {
      this.newestShops = shops;
    }));
    this.subscriptions.push(this.shopService.getShopByRating().subscribe((shops) => {
      this.loadingService.hideLoading();
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
