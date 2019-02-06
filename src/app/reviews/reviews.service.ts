import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Shop } from '../shops/shops.model';
import { Review } from './reviews.model';

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

    getReviewsByNewest(shopId: string){
        return this.http.get<Review[]>(`http://localhost:30000/api/reviews/${shopId}`);
    }
}