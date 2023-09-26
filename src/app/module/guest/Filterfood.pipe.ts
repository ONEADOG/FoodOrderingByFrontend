import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Filterfood'
})
export class FilterFoodPipe implements PipeTransform {
  transform(foods: any[], type: string): any[] {
    if (!foods || !type) {
      return foods;
    }
    return foods.filter(food => food.foodType === type);
  }
}
