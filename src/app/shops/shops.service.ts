import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {  BehaviorSubject } from "rxjs";
import { map } from 'rxjs/operators';

import { Shop } from "./shops.model";

@Injectable({ providedIn: "root" })
export class ShopsService {
    constructor(private http: HttpClient) {
        this.updateShopList();
    }
    private shops: Shop[] = [];
    private _shops: BehaviorSubject<Shop[]> = new BehaviorSubject<Shop[]>([]);
    filterChanged = new EventEmitter();

    filter = {
        location: '',
        fcs: ''
    }

    getShopsDisplay(){
        return this.http.get<Shop[]>("http://localhost:3000/api/shops");
    }

    updateShopList() {
        this.getShopsDisplay().toPromise().then((shops) => {
            this._shops.next(shops);
        })
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

    getShops(): BehaviorSubject<Shop[]> {
        return this._shops
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
    
    getFilteredShops(): Shop[] {
        return this._shops.getValue().filter((shop) => {
            return this.isLocationMatch(shop) && this.isFCSMatch(shop);
        });
    }

    private isLocationMatch(shop: Shop): boolean {
        if (!this.filter.location) {
            return true;
        }

        return shop.address.toLowerCase().includes(this.filter.location.toLowerCase());
    }

    private isFCSMatch(shop: Shop): boolean {
        if (!this.filter.fcs) {
            return true;
        }

        const isFoodEstabName = shop.fe_name.toLowerCase().includes(this.filter.fcs.toLowerCase());

        const hasConsumableInFoodEstab = this.isConsumableInFoodEstab(shop);

        return isFoodEstabName || hasConsumableInFoodEstab;
    }

    private isConsumableInFoodEstab(shop: Shop): boolean {
        let hasConsumable = false

        shop.Consumables.forEach((consumable) => {
            if(consumable.c_name.toLowerCase().includes(this.filter.fcs.toLowerCase())) {
                hasConsumable = true;
            }
        });

        return hasConsumable;
    }
}

export enum FilterKeys {
    FCS = 'fcs',
    Location = 'location'
}