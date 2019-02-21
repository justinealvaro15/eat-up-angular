import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopsService } from '../shops/shops.service';
import { Shop } from '../shops/shops.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit, OnDestroy {
  shops: Shop[] = [];
  getShopSubscription: Subscription;

  constructor(
    private shopService: ShopsService
  ) { }

  ngOnInit() {
    this.getShopSubscription = this.shopService.filterChanged.subscribe((filter) => {
      this.getFilteredShops();
      console.log(filter);
      if (filter.location) {
        this.shopService.getCoordinatesByLocationId(filter.location).toPromise().then(location => {
          // console.log(location); sa sear
        }); 
      }
    })
    this.getFilteredShops();
  }

  ngOnDestroy() {
    try {
      this.getShopSubscription.unsubscribe();
    } catch { }
  }

  getFilteredShops() {
    this.shops = this.shopService.getFilteredShops();
  }
}
