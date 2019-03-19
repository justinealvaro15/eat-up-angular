export const FoodBeveragesMapping: {
    [key: string]: FoodGroupAndCategory
  } = {
    meals: {
      group: 'Food',
      type: 'Meals'
    },
    brandedFood: {
      group: 'Food',
      type: 'Branded'
    },
    streetFoods: {
      group: 'Food',
      type: 'StreetFoods'
    },
    sweets: {
      group: 'Food',
      type: 'Sweets'
    },
    sandwiches: {
      group: 'Food',
      type: 'Sandwiches'
    },
    meryenda: {
      group: 'Food',
      type: 'Meryenda'
    },
    pastaNoodles: {
      group: 'Food',
      type: 'PastaNoodles'
    },
    brandedBeverage: {
      group: 'Beverages',
      type: 'Branded',
      isBranded: true
    },
    inHouseBeverage: {
      group: 'Beverages',
      type: 'InHouse'
    }
  }
  
export const FoodGrouping: FoodGroup[] = [
    {
        name: 'Food',
        category: [
        { value: FoodBeveragesMapping.meals, viewValue: 'Meals' },
        { value: FoodBeveragesMapping.meryenda, viewValue: 'Meryenda' },
        { value: FoodBeveragesMapping.sandwiches, viewValue: 'Sandwiches' },
        { value: FoodBeveragesMapping.pastaNoodles, viewValue: 'Pasta/Noodles' },
        { value: FoodBeveragesMapping.sweets, viewValue: 'Sweets' },
        { value: FoodBeveragesMapping.streetFoods, viewValue: 'Street Foods' },
        { value: FoodBeveragesMapping.brandedFood, viewValue: 'Branded Foods' }
        ]
    },
    {
        name: 'Beverages',
        category: [
        { value: FoodBeveragesMapping.inHouseBeverage, viewValue: 'In-House' },
        { value: FoodBeveragesMapping.brandedBeverage, viewValue: 'Branded Beverages '}
        ]
    }
];


export interface FoodGroup {
    disabled?: boolean;
    name: string;
    category: Category[];
}

  
export interface Category {
    value: FoodGroupAndCategory;
    viewValue: string;
}

  
export interface FoodGroupAndCategory {
    group: string;
    type: string;
    isBranded?: boolean;
}
  
export interface AddedMenu extends FoodGroupAndCategory {
    name: string;
    price: number;
    amount: string;
}
  
  
  