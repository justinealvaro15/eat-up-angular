import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'app/user/shops/shops.model';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
  // @Input() shop: Shop;
  @Input() stars: number;

  constructor() { }

  ngOnInit() {
  }

  getShopPercentRating() {
    const ratingInPercent = this.stars/5*100;
    return `${ratingInPercent}%`;
  }
}
