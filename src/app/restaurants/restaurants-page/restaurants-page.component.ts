import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { RestaurantFilterPipe } from '../pipes/restaurant-filter.pipe';
import { Title } from '@angular/platform-browser';
import { RestaurantsService } from '../services/restaurants.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


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
export class RestaurantsPageComponent implements OnInit{

  restaurants: Restaurant[] = [];
  creatorId!: number;

  constructor(
    private titleService: Title,
    private readonly restaurantsService: RestaurantsService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Restaurants List");

    this.creatorId = this.route.snapshot.queryParams['creator'];

    if (this.creatorId !== undefined)
    {
      this.restaurantsService.getRestaurantsUser(this.creatorId)
      .subscribe({
        next: rests => this.restaurants = rests,
        error: error => console.error(error)
      });

    } else {
      this.restaurantsService.getRestaurants()
      .subscribe({
        next: rests => this.restaurants = rests,
        error: error => console.error(error),
        complete: () => console.log("Restaurants loaded")
      });
      console.log("ngOnInit " + this.restaurants);
    }
  }

  filterSearch = '';
  onlyOpen = false;


  onDeleted(restaurant: Restaurant) {
    this.restaurantsService.deleteRestaurant(restaurant.id as number)
    .subscribe({
      next: () => {
          //this.router.navigate(['/restaurants']);
          Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Restaurant removed'
        }).then(() => {
          window.location.reload();
        });
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: error.error.message
        })
      }
    });
  }

  toggleOnlyOpen() {
    this.onlyOpen = !this.onlyOpen;
  }

}
