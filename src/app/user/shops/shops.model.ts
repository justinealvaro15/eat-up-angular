// import { ImgSrcDirective } from "@angular/flex-layout";

export interface Shop {
    fe_id: string;
    fe_name: string;
    type: string;
    address: string;
    coordinates: {
        lat: number,
        long:number
    };
    contact_person: string;
    contact_number: string;
    hours:{
        opening: {
            hour: number,
            minute: number
        },
        closing: {
            hour: number,
            minute: number
        };
    };
    days_open: string[];
    AddlTakeOutCost: string;
    FreeWater: string;
    BYOBIncentive: string;
    SeatingCapacity: string | number;
    CLAYGO: string;
    fe_avg_rating: number;
    no_of_ratings: number;
    Food:{
        Branded: BrandedConsumables[];
        StreetFoods: Consumables[];
        Sweets: Consumables[];
        Sandwiches: Consumables[];
        PastaNoodles: Consumables[];
        Meals: Consumables[];
        Meryenda: Consumables[];
    };
    Beverages:{
        Branded: BrandedConsumables[];
        InHouse: Consumables[];
    };
    ComboMeal: any[];
    image: string;
    Consumables: Consumables[];
    BrandedConsumables: BrandedConsumables[];
    Nearest_Bldgs: LocationID[];
}

export interface LocationID {
    id: number;
}

export class Consumables {
    c_name: string;
    price: number;
    c_avg_rating?: number;
    username?: string;
    amount?: string;
}

export class BrandedConsumables extends Consumables {
    // bc_name: string;
    amount: string;
}