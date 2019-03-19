import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(list: any, searchText: string): any {
      debugger;

    if (!list) { return []; }
    if (!searchText) { return list; }

    const value = list.replace(
      searchText, `<span style='background-color:#fb5050'>${searchText}</span>` );
    //console.log('value', value);

    return this._sanitizer.bypassSecurityTrustHtml(value);
  }

// transform(list: any, searchText: string): any[] {
//     debugger;
//     console.log('lists', list);
//     console.log('searchText', searchText);
    
//     if (!list) { return []; }
//     //to remove highlighted tags before any processing
//     // list = list.map(function (item) {
//     //   item.name = item.name ? String(item.name).replace(/<[^>]+>/gm, '') : '';
//     //   return item;
//     // })
//     if (!searchText) { return list; }
    
//     const re = new RegExp(searchText, 'gi');
//     const value = list
//       .map(function (item) {
//         //this will match the values and add the highlight tag for it
//         item.name = item.name.replace(re, "<span class='yellow'>" + searchText + "</span>");
//         return item
//       });
//     return value;
// }
}
