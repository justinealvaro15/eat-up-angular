import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';

import { Shop } from "./shops.model";

@Injectable({ providedIn: "root" })
export class ShopsService {
    constructor(private http: HttpClient) {}
    private shops: Shop[] = [];

    getShopsDisplay(){
        // re
        return this.http.get<Shop[]>("http://localhost:3000/api/shops");
    }

    getShopById(shopId: string) {
        return this.http.get<Shop|null>(`http://localhost:3000/api/shops/${shopId}`).pipe(
                map((shops: any) => {
                    return shops.length > 0 ? shops[0] : null;
                })
            );
    }

    getShopByRating(){
        return this.http.get<Shop[]>("http://localhost:3000/api/shops/topten");
    }

    getShopByNewest(){
        return this.http.get<Shop[]>("http://localhost:3000/api/shops/newest");
    }
}