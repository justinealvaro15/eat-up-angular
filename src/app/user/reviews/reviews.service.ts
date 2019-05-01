import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Shop } from '../shops/shops.model';
import { Review } from './reviews.model';
import { AddedReview } from '../food-estab/add-rating-review/add-rating-review.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
    user: SocialUser;
    filterChanged = new EventEmitter();

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ){
        this.authService.authState.subscribe((user) => {
            this.user = user;
        })
        this.updateReviewsList();
    }

    filter = {
        user_id: '',
    }

    setFilter(key: FilterKeys, filterValue: string) {
        this.filter[key] = filterValue;
        this.filterChanged.emit(this.filter);
    }

    clearFilters() {
        Object.keys(this.filter).forEach((filterKey) => {
            this.filter[filterKey] = '';
        })
    }

    private reviews: Review[] = [];
    private _reviews: BehaviorSubject<Review[]> = new BehaviorSubject<Review[]>([]);

    getAllReviews() {
        return this.http.get<Review[]>(`http://localhost:3000/api/reviews`);
    }

    getReviewsByNewest(shopId: string){
        return this.http.get<Review[]>(`http://localhost:3000/api/reviews/${shopId}`);
    }

    updateReviewsList() {
        this.getAllReviews().toPromise().then((reviews)=> {
                this._reviews.next(reviews);
        });
    }
    getReview(): BehaviorSubject<Review[]>{ //G
        return this._reviews;
    }

    getFilteredReviews() {
        //console.log(this._reviews);
        return this._reviews.getValue().filter((review)=>{
            return this.isUsersReview(review);
        });
    }

    private isUsersReview(review:Review):boolean{
        if (!this.filter.user_id) {
            return true;
        }
        return review.user_id===this.filter.user_id;
    }

    addReview(shopId: string, addedReview: AddedReview) {
        const payload =  {
            user: this.user,
            addedReview
        }
        this.http.post(`http://localhost:3000/api/reviews/${shopId}`, payload).subscribe();
    }

    editReviewByShopid(shopId: string, rating: number, review: string) {
        const payload = {
            rating,
            review,
            user: this.user
        }
        this.http.put(`http://localhost:3000/api/reviews/${shopId}`, payload).subscribe();
    }
}

export enum FilterKeys {
    USER_ID = 'user_id',
}