import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilterUser'
})
export class CustomFilterUserPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items; // ถ้า items หรือ searchText เป็น falsy ให้คืนค่ากลับไปเลย
    }
    
    searchText = searchText.toLowerCase();
    
    return items.filter(item => this.checkInside(item, searchText));
  }

  private checkInside(item: any, searchText: string): boolean {
    for (const property in item) {
      if (item[property] === null || item[property] === undefined) {
        continue;
      }
      if (typeof item[property] === 'object') {
        if (this.checkInside(item[property], searchText)) {
          return true;
        }
      } else if (item[property].toString().toLowerCase().includes(searchText)) {
        return true;
      }
    }
    return false;
  }
}
