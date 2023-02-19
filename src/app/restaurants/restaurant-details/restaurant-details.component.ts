import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Restaurant } from 'src/app/restaurants/interfaces/restaurant';
import { RestaurantsService } from '../services/restaurants.service';
import { RestaurantCardComponent } from "../restaurant-card/restaurant-card.component";
import Swal from 'sweetalert2';
import { ArcgisMapComponent } from 'src/app/maps/arcgis-map/arcgis-map.component';
import { ArcgisMarkerDirective } from 'src/app/maps/arcgis-marker/arcgis-marker.directive';
import { ArcgisSearchDirective } from 'src/app/maps/arcgis-search/arcgis-search.directive';

import { UserService } from 'src/app/users/services/user.service';
import { User } from 'src/app/auth/interfaces/user';

@Component({
    selector: 'fs-restaurant-details',
    standalone: true,
    templateUrl: './restaurant-details.component.html',
    styleUrls: ['./restaurant-details.component.css'],
    imports: [
      CommonModule,
      RouterLink,
      RestaurantCardComponent,
      ArcgisMapComponent,ArcgisMarkerDirective,ArcgisSearchDirective
    ]
})
export class RestaurantDetailsComponent implements OnInit{

  restaurant!: Restaurant;
  userRest!: User;
  restaurantDetail = false;
  latitude!: number;
  longitude!: number;

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

    this.latitude = this.restaurant.lat;
    this.longitude = this.restaurant.lng;

    this.userService.getUser(this.restaurant.creator?.id)
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
