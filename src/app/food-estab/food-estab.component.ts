import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shop } from '../shops/shops.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ShopsService } from '../shops/shops.service';

@Component({
  selector: 'app-food-estab',
  templateUrl: './food-estab.component.html',
  styleUrls: ['./food-estab.component.css']
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
}
