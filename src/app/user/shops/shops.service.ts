import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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
        this.coordinate = {
            long: null,
            lat: null
        }
    }
    private locationCoors: Location;
    private shops: Shop[] = [];
    private _shops: BehaviorSubject<Shop[]> = new BehaviorSubject<Shop[]>([]);
    filterChanged = new EventEmitter();

    filter = {
        location: 0,
        fcs: ''
    }

    setCoordinates(long: string, lat: string) {
        this.coordinate.long = long;
        this.coordinate.lat = lat;
        //console.log("inSetCoordinates: "+ this.coordinate.lat + " " + this.coordinate.long);
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
        return this.http.get<Shop | null>(`http://localhost:3000/api/location/${locationId}`).pipe(
            map((location: any) => {
                // console.log(location[0].coordinates.long);
                if (location.length > 0) {
                    this.setCoordinates(location[0].coordinates.long, location[0].coordinates.lat);
                }
                return location.length > 0 ? location[0].coordinates : null;
            })
        );
    }

    getShopById(shopId: string) {
        return this.http.get<Shop | null>(`http://localhost:3000/api/shops/${shopId}`).pipe(
            map((shops: any) => {
                return shops.length > 0 ? shops[0] : null;
            })
        );
    }

    getShopByRating() {
        return this.http.get<Shop[]>('http://localhost:3000/api/shops/topten');
    }

    getShopByNewest() {
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
        const payload = {
            user: this.user,
            addedMenu
        }
        this.http.post(`http://localhost:3000/api/shops/${shopId}/${addedMenu.group.toLowerCase()}`, payload).subscribe();
    }


    getFilteredShops(): Shop[] { //has to be modified
         //get FCS Matches first then order from nearest to farthest
         if (this.filter.fcs && this.filter.location) { //both location and fcs
            const filteredShops = this._shops.getValue().filter((shop)=> {
                return this.isFCSMatch(shop);
            });
            return this.isArrayShopNearBldg(filteredShops);
         }
         else { //either location and fcs only
                return this._shops.getValue().filter((shop) => {
                    // console.log(shop)    
                    if (this.filter.fcs) { //fcs search only
                       return this.isFCSMatch(shop);
                    }
                    else if (this.filter.location != 0){ //location only 
                        return this.isShopNearBldg(shop);
                    }
                });
         }
        
     }

    private getNearestShops(...args) { //any number of parameters (in this case 0 or 1)
        /* Takes the chosen location's coordinates(LC) from getCoordinatesbyLocationId (how to access it to here)
           Takes all shops coordinates (SC) from shop service getShopsCoordinates
           Applies Euclidean Distance (ED) on all SC with LC
           Stores the resulting ED in an array of [(shop id, ED),... ] in order of lowest to highest
           returns list of shops in that order */
        //  ]
        var shops: any;
        if (args) {
            shops = this._shops.getValue(); //array of objects
        } else {
            shops = args;
        }
        //console.log(shops);
        var shopDistance = []
        var shopLat = 0;
        var shopLong = 0;
        for (var i = 0; i < shops.length; i++) {
            shopLat = shops[i].coordinates.lat;
            shopLong = shops[i].coordinates.long;
            //[fe_id, Euclidean Distance between it and the bldg]
            shopDistance.push([shops[i].fe_id, Math.hypot(Number(this.coordinate.lat) - shopLat, Number(this.coordinate.long) - shopLong)]);
        }


        shopDistance.sort(function (a, b) {
            return a[1] - b[1];
        }); //sorted
        //console.group(shopDistance);
        // return this.sortShop(shop,[shopId, dist]);//{"shop": [shopId, dist]};
        return 0;
    }

    private isArrayShopNearBldg(filteredShops: Shop []): Shop[] {
        /* 
            Takes an array of shops already filtered by isFCSMatch, filteredShops,
            and figures out whether the chosen building of the user
            is near one of those shops.
        */
        let arrayShopsNearBldg=[];
        for (var i = 0;i<filteredShops.length;i++) {
          
           
            filteredShops[i].Nearest_Bldgs.forEach((bldg)=>{
                if (bldg.id == this.filter.location) {
                    arrayShopsNearBldg.push(filteredShops[i]);
                }
            });
            
        }
        return arrayShopsNearBldg;
    }

   

    private isFCSMatch(shop: Shop): boolean{ //Food or Shop Match Only
        //need to take into account trailing whitespace
        if (!this.filter.fcs){
            return true;
        }
    
        const isFoodEstabName = shop.fe_name.toLowerCase().includes(this.filter.fcs.toLowerCase());

        const hasConsumableInFoodEstab = this.isConsumableInFoodEstab(shop); //not workin
        console.log("IN isFCSMatch");
        return isFoodEstabName || hasConsumableInFoodEstab;
       
    }

    private isShopNearBldg(shop: Shop): boolean { //Location Only 
            let shopNearBldg = false;
            shop.Nearest_Bldgs.forEach((bldg) => {
                if (bldg.id == this.filter.location) {
                    shopNearBldg = true;
                }
            });
            console.log("isShopNearBldg "+ shopNearBldg);
            return shopNearBldg;     
    }

    private isConsumableInFoodEstab(shop: Shop): boolean {
        let hasConsumable = false

        shop.Consumables.forEach((consumable) => {
            
            if (consumable.c_name.toLowerCase().includes(this.filter.fcs.toLowerCase())) {
                hasConsumable = true;
            }
        });
        console.log(this.filter.fcs+" "+hasConsumable);
        return hasConsumable;
    }
}

export enum FilterKeys {
    FCS = 'fcs',
    Location = 'location'
}