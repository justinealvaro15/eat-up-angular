import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationSearch'
})
export class LocationSearchPipe implements PipeTransform {

  transform(foodestablishments: any[], location: string): any [] {
        if (!foodestablishments)
          return [];
        if (location === null)
          return null;
        if (location === "")
          return null;
        var resultsArray=[];

        var fe_nameSearch = foodestablishments.filter( fe => {
          var str = fe.address
          return str.toLocaleLowerCase().includes(location.toLocaleLowerCase()); //boolean
        });

        for (var i=0;i<fe_nameSearch.length;i++){
              resultsArray.push(fe_nameSearch[i])
        }


        resultsArray = Array.from(new Set(resultsArray));
        function compare(a, b) {
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
        resultsArray.sort(compare);
        return resultsArray;

  }

}
