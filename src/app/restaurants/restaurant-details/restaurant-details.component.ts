import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Restaurant } from 'src/app/restaurants/interfaces/restaurant';
import { RestaurantsService } from '../services/restaurants.service';
import { RestaurantCardComponent } from "../restaurant-card/restaurant-card.component";
import Swal from 'sweetalert2';
import { UserService } from 'src/app/users/services/user.service';
import { User } from 'src/app/auth/interfaces/user';

@Component({
    selector: 'fs-restaurant-details',
    standalone: true,
    templateUrl: './restaurant-details.component.html',
    styleUrls: ['./restaurant-details.component.css'],
    imports: [CommonModule, RouterLink, RestaurantCardComponent]
})
export class RestaurantDetailsComponent implements OnInit{

  restaurant!: Restaurant;
  userRest!: User;
  restaurantDetail = false;

  constructor(
    private route: ActivatedRoute,
    private restaurantsService: RestaurantsService,
    private userService: UserService,
    private router: Router
  ) {  }

  goBack() {
    this.router.navigate(['/restaurants']);
  }

  ngOnInit(): void {
    this.restaurant = this.route.snapshot.data['restaurant'];

    this.userService.getUser(this.restaurant.creator)
    .subscribe((user) => {
      this.userRest = user;
    })

  }

  onDeleted(restaurant: Restaurant) {
    this.restaurantsService.deleteRestaurant(restaurant.id as number)
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Restaurant removed'
        }).then(() => {
          this.router.navigate(['/restaurants']);
        });
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: error
        })
      }
    });
  }

}
