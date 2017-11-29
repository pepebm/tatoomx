import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
 transform(items: any[], field: string, value: string): any[] {
   if(!!value) {
     if (!!items) return items.filter(item => item[field].toLowerCase().indexOf(value) > -1);
     else return [];
   } else {
     return items;
   }
 }
}
