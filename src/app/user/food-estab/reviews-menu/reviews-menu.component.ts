import { Component, OnInit, Input } from '@angular/core';
import { Shop } from './../../shops/shops.model';
import { Review } from 'app/user/reviews/reviews.model';

@Component({
  selector: 'app-reviews-menu',
  templateUrl: './reviews-menu.component.html',
  styleUrls: ['./reviews-menu.component.css']
})
export class ReviewsMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() shop: Shop;
  @Input() reviews: Review[];
}
