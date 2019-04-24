import {Component} from '@angular/core';
import { Shop } from 'app/user/shops/shops.model';
import { Subscription } from 'rxjs';
import { ShopsService } from 'app/user/shops/shops.service';
import { LoadingService } from 'app/loading.service';
import { Review } from 'app/user/reviews/reviews.model';
import { ReviewsService } from 'app/user/reviews/reviews.service';

export interface Filter {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-ratings-reviews',
  templateUrl: './ratings-reviews.component.html',
  styleUrls: ['./ratings-reviews.component.css']
})
export class RatingsReviewsComponent{
  shops: Shop[] = [];
  filteredShops: Shop[] = [];
  subscriptions: Subscription[] = [];
  reviews: Review[] = [];

  constructor(
    private shopService: ShopsService,
    private reviewService: ReviewsService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.showLoading();
    this.subscriptions.push(this.shopService.getAllShops().subscribe((shops) => {
      this.loadingService.hideLoading();
      this.shops = shops;
      this.filteredShops = this.shops;
    }));
    this.reviewService.getAllReviews().subscribe((reviews) => {
      this.reviews = reviews;
      console.log(this.reviews);
    });
  }

  options: Filter[] = [
    {value: 1, viewValue: 'Highest Rated'},
    {value: 2, viewValue: 'Lowest Rated'},
    {value: 3, viewValue: 'Most Reviewed'},
    {value: 4, viewValue: 'Least Reviewed'},
  ];

  applyFilter(filter: any) {
    console.log(filter);
    switch (filter) {
      case "1":
        this.filteredShops = this.shops.sort((a, b) => {
          if (a.fe_avg_rating > b.fe_avg_rating) {
            return -1;
          } else if (a.fe_avg_rating < b.fe_avg_rating) {
            return 1;
          }
          return 0;
        });
        break;
      case "2":
        this.filteredShops = this.shops.sort((a, b) => {
          if (a.fe_avg_rating > b.fe_avg_rating) {
            return 1;
          } else if (a.fe_avg_rating < b.fe_avg_rating) {
            return -1;
          }
          return 0;
        });
        break;
      case "3":
        this.filteredShops = this.shops.sort((a, b) => {
          const shopAReviewCount = this.reviews.filter((review) => review.fe_id === a.fe_id).length;
          const shopBReviewCount = this.reviews.filter((review) => review.fe_id === b.fe_id).length;
          
          if (a.fe_avg_rating > b.fe_avg_rating) {
            return -1;
          } else if (a.fe_avg_rating < b.fe_avg_rating) {
            return 1;
          }
          return 0;
        });
        break;
      case "4":
        this.filteredShops = this.shops.sort((a, b) => {
          const shopAReviewCount = this.reviews.filter((review) => review.fe_id === a.fe_id).length;
          const shopBReviewCount = this.reviews.filter((review) => review.fe_id === b.fe_id).length;
          
          if (a.fe_avg_rating > b.fe_avg_rating) {
            return 1;
          } else if (a.fe_avg_rating < b.fe_avg_rating) {
            return -1;
          }
          return 0;
        });
        break;
    }
  }
}

