import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Shop } from '../shops/shops.model';
import { Review } from './reviews.model';
import { AddedReview } from '../food-estab/add-rating-review/add-rating-review.component';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
    user: SocialUser;
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ){
        this.authService.authState.subscribe((user) => {
            this.user = user;
        })
    }
    private reviews: Review[] = [];

    getAllReviews() {
        return this.http.get<Review[]>(`http://localhost:3000/api/reviews`);
    }

    getReviewsByNewest(shopId: string){
        return this.http.get<Review[]>(`http://localhost:3000/api/reviews/${shopId}`);
    }

    // getReviewsByUserId(userId: string){
    //     return this.http.get<Review[]>(`http://localhost:3000/api/reviews/${userId}`);
    // }

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