import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopsService } from '../shops.service';
import { Shop } from '../shops.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit, OnDestroy {
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

}
