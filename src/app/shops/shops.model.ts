// import { ImgSrcDirective } from "@angular/flex-layout";

export interface Shop {
    fe_id: string;
    fe_name: string;
    type: string;
    address: string;
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
    Consumables: Consumables[];
    BrandedConsumables: BrandedConsumables[];
    ComboMeal: any[];
    image: string;
}

export interface Consumables {
    c_name: string;
    type: string;
    price: number;
    c_avg_rating?: number;
}

export interface BrandedConsumables {
    bc_name: string;
    amount: string;
    type: string;
    price: number;
    c_avg_rating: number;
}