import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';

@Pipe({
  name: 'restaurantFilter',
  standalone: true
})
export class RestaurantFilterPipe implements PipeTransform {

  transform(restaurants: Restaurant[],filterBy: string,onlyOpen: boolean): Restaurant[] {

    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    const today = new Date().getDay();
    
    if(onlyOpen) {

      restaurants = restaurants.filter(rest => rest.daysOpen.includes(today.toString()));

    }

    return filter ? restaurants.filter((restaurant) =>
      restaurant.description.toLocaleLowerCase().includes(filter) ||
      restaurant.name.toLocaleLowerCase().includes(filter)) : restaurants;
  }

}
