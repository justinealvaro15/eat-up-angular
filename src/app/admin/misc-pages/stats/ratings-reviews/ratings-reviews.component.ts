import {Component} from '@angular/core';

export interface Filter {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-ratings-reviews',
  templateUrl: './ratings-reviews.component.html',
  styleUrls: ['./ratings-reviews.component.css']
})
export class RatingsReviewsComponent{
  options: Filter[] = [
    {value: 'highest-rated-0', viewValue: 'Highest Rated'},
    {value: 'lowest-rated-1', viewValue: 'Lowest Rated'},
    {value: 'most-reviewed-2', viewValue: 'Most Reviewed'},
    {value: 'most-reviewed-3', viewValue: 'Least Reviewed'},
  ];
}

