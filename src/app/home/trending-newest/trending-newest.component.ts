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
  newestShops: Shop[] = [];
  trendingShops: Shop[] = [];
  shops: Shop[] = []
  subscriptions: Subscription[] = [];
  private nameFilter: string;
  private locationFilter: string;


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

  onNameFilterChange(name) {
    this.nameFilter = name;
  }

  onLocationFilterChange(location) {
    this.locationFilter = location;
  }

  getFilteredShops(shops: Shop[]): Shop[] {
    return shops.filter((shop) => {
      return this.isLocationMatch(shop) && this.isNameMatch(shop);
    });
  }

  private isLocationMatch(shop: Shop): boolean {
    if (!this.locationFilter) {
      return true;
    }

    return shop.address.toLowerCase().includes(this.locationFilter.toLowerCase());
  }

  private isNameMatch(shop: Shop): boolean {
    if (!this.nameFilter) {
      return true;
    }

    const isFoodEstabName = shop.fe_name.toLowerCase().includes(this.nameFilter.toLowerCase());

    const hasConsumableInFoodEstab = this.isConsumableInFoodEstab(shop);

    return isFoodEstabName || hasConsumableInFoodEstab;
  }

  private isConsumableInFoodEstab(shop: Shop): boolean {
    let hasConsumable = false

    shop.Consumables.forEach((consumable) => {
      if(consumable.c_name.toLowerCase().includes(this.nameFilter.toLowerCase())) {
        hasConsumable = true;
      }
    });

    return hasConsumable;
  }
}
