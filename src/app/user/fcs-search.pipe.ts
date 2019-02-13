 import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fcsSearch'
})
//STILL NEEDS TO BE CHANGED FOR REMOTE DATA see this -> https://mdbootstrap.com/docs/angular/forms/search/
export class FcsSearchPipe implements PipeTransform {
      //the var :foodestablishments" gets from the mock_db at home-search-component.ts
      transform(foodestablishments: any[], fcs: string): any [] {
            if (!foodestablishments)
              return [];
            if (fcs === null)
              return null;
            if (fcs === "")
              return null;

            var resultsArray=[];

            //fe_nameSearch is an array of Objects where the objects are the foodestablishment info
            var fe_nameSearch = foodestablishments.filter( fe => { //searches for food establishment names
              var str = fe.fe_name
              return str.toLocaleLowerCase().includes(fcs.toLocaleLowerCase()); //boolean
            });

            for (var i=0;i<fe_nameSearch.length;i++){
                  resultsArray.push(fe_nameSearch[i]) //push all the elements of fe_nameSearch to resultsArray
            }

            var consumableSearch =  foodestablishments.filter( fe => {
                  var consumableArr = fe.Consumables;
                  for (var i =0; i < consumableArr.length;i++) { //iterates thru the consumables list of a foodestablishments
                         var cons = consumableArr[i].c_name;
                         if (cons.toLocaleLowerCase().includes(fcs.toLocaleLowerCase())) //if the search term  is included in a consumable name
                            return cons.toLocaleLowerCase().includes(fcs.toLocaleLowerCase());
                   }
            });

            for (var i=0;i<consumableSearch.length;i++){
                  resultsArray.push(consumableSearch[i])
            }

            var brandedconsumableSearch = foodestablishments.filter( fe => {
                  var brandedconsumableArr = fe.BrandedConsumables;
                  for (var i =0; i < brandedconsumableArr.length;i++) {
                        var bcons = brandedconsumableArr[i].bc_name;
                        if (bcons.toLocaleLowerCase().includes(fcs.toLocaleLowerCase())) //TRUE
                             return bcons.toLocaleLowerCase().includes(fcs.toLocaleLowerCase());
                  }
            });

            for (var i=0;i<brandedconsumableSearch.length;i++){
                  resultsArray.push(brandedconsumableSearch[i])
            }


            resultsArray = Array.from(new Set(resultsArray)); //remove duplicates

            function compare(a, b) { //comparing two fe_names
                // Use toUpperCase() to ignore character casing
                const fe_name1 = a.fe_name.toLocaleLowerCase();
                const fe_name2 = b.fe_name.toLocaleLowerCase();

                let comparison = 0;
                if (fe_name1 > fe_name2) {
                  comparison = 1;
                } else if (fe_name1 < fe_name2) {
                  comparison = -1;
                }
                return comparison;
            }
            resultsArray.sort(compare); //alphabetical sort
            console.log(resultsArray)
            return resultsArray;

      }
}
