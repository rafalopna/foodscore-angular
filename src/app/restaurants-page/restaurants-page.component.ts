import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { RestaurantFilterPipe } from '../pipes/restaurant-filter.pipe';

@Component({
  selector: 'fs-restaurants-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RestaurantFormComponent,
    RestaurantCardComponent,
    RestaurantFilterPipe
  ],
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css']
})
export class RestaurantsPageComponent {

  filterSearch = '';
  onlyOpen = false;

  restaurants: Restaurant[] = [
    {
      name: 'This is Restaurant',
      image: '/assets/ejemplo.jpg',
      cuisine: 'Something',
      description: 'Write a description',
      phone: '123456789',
      daysOpen: ['0','1','2','3','4','5','6']
    }
  ];

  addRestaurant(restaurant: Restaurant) {
    this.restaurants = [...this.restaurants,restaurant];
  }

  onDeleted(restaurant: Restaurant) {
    this.restaurants = this.restaurants.filter(r => r !== restaurant);
  }

  toggleOnlyOpen() {
    this.onlyOpen = !this.onlyOpen;
  }

}
