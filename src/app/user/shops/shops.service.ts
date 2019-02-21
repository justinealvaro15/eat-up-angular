import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from './shops.model';
import { Location } from '../location/location.model';
import { AddedMenu } from '../food-estab/add-menu-item/add-menu-item.component';
import { AuthService, SocialUser } from 'angularx-social-login';
import { LocationService } from '../location/location.service';

@Injectable({ providedIn: 'root' })
export class ShopsService {
    user: SocialUser;
    coordinate: {
        long: string,
        lat: string
    }
    constructor(
        private locationService: LocationService,
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.updateShopList();
        this.authService.authState.subscribe((user) => {
            this.user = user;
        })
    }
    private locationCoors:Location;
    private shops: Shop[] = [];
    private _shops: BehaviorSubject<Shop[]> = new BehaviorSubject<Shop[]>([]);
    filterChanged = new EventEmitter();

    filter = {
        location: '',
        fcs: ''
    }

    setCoordinates(long: string, lat: string) {
        this.coordinate.long = long;
        this.coordinate.lat = lat;
    }

    getShopsDisplay() {
        return this.http.get<Shop[]>('http://localhost:3000/api/shops');
    }

    updateShopList() {
        this.getShopsDisplay().toPromise().then((shops) => {
            this._shops.next(shops);
        })
    }

    getCoordinatesByLocationId(locationId: string) { 
        return this.http.get<Shop|null>(`http://localhost:3000/api/location/${locationId}`).pipe( 
            map((location: any) => {
                // console.log(location[0].coordinates);
                this.setCoordinates(location[0].coordinates.long, location[0].coordinates.lat);
                return location.length > 0 ? location[0].coordinates : null;
            })
        );
    }

    getShopById(shopId: string) {
        return this.http.get<Shop|null>(`http://localhost:3000/api/shops/${shopId}`).pipe(
            map((shops: any) => {
                return shops.length > 0 ? shops[0] : null;
            })
        );
    }

    getShopByRating(){
        return this.http.get<Shop[]>('http://localhost:3000/api/shops/topten'); 
    }

    getShopByNewest(){
        return this.http.get<Shop[]>('http://localhost:3000/api/shops/newest');
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

    addFoodOrBeverageByShopId(shopId: string, addedMenu: AddedMenu) {
        const payload =  {
            user: this.user,
            addedMenu
        }
        this.http.post(`http://localhost:3000/api/shops/${shopId}/${addedMenu.group.toLowerCase()}`, payload).subscribe();
    }


    getFilteredShops(): Shop[] { //has to be modified
        //get FCS Matches first then order from nearest to farthest
        return this._shops.getValue().filter((shop) => {
            // console.log(shop);
            return this.isLocationMatch(shop) && this.isFCSMatch(shop);
        });
    }

    private isLocationMatch(shop: Shop): boolean { 
        /* Takes the chosen location's coordinates(LC) from getCoordinatesbyLocationId (how to access it to here)
            Takes all shops coordinates (SC) from shop service getShopsCoordinates
            Applies Euclidean Distance (ED) on all SC with LC
            Stores the resulting ED in an array of [(shop id, ED),... ] in order of lowest to highest
            returns list of shops in that order */
          //  ]
        var locationCoors = this.getCoordinatesByLocationId(this.filter.location); //need to get the return
        var shopsCoor = shop.coordinates;//this.getShopsDisplay(); //to get an Array of Shops Coordinates (is it possible to limit the returned value to shopId and coordinates only?)
        //how to get shops
        var distanceArr;
        // console.log("lc:");
        //  console.log(locationCoors);
        // console.log("sc:");
        // console.log(typeof shopsCoor);
     
  
        //Euclidean Distance
        //loop over all shops
            //var distance  = Math.hypot(locationCoor.lat - shop.lat , locationCoor.long - shop.long);
            //var shopscoor = [shopId, distance]
            //distanceArr.push(shopscoor)
        //distanceArr.sort(function(a,b) {
        //    return a[1] - b[1];
        //})
        //use distanceArr to sort how it should be ordered on result
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