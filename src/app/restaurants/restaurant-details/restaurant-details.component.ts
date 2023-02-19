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
import { CommentRest } from '../interfaces/comment';
import { OneCheckedDirective } from 'src/app/shared/validators/one-checked.directive';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'fs-restaurant-details',
    standalone: true,
    templateUrl: './restaurant-details.component.html',
    styleUrls: ['./restaurant-details.component.css'],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      OneCheckedDirective,
      RouterLink,
      RestaurantCardComponent,
      ArcgisMapComponent,ArcgisMarkerDirective,ArcgisSearchDirective
    ]
})
export class RestaurantDetailsComponent implements OnInit{

  restaurant!: Restaurant;
  userRest!: User;
  commentsRest: CommentRest[] = [];
  restaurantDetail = false;
  latitude!: number;
  longitude!: number;
  saved = false;
  scoreStars = document.querySelectorAll("#stars span[data-score]");
  scoreSelected!: number;
  score!: number;
  newComment!: CommentRest;
  userLogged!: User;
  isCommented = false;

  commentForm!: FormGroup;
  commentControl!: FormControl<string>;


  constructor(
    private route: ActivatedRoute,
    private restaurantsService: RestaurantsService,
    private userService: UserService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) { this.resetComment() }

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
    });

    this.userService.getUser()
    .subscribe((user) => {
      this.userLogged = user;
    });

    this.restaurantsService.getComments(this.restaurant.id as number)
    .subscribe({
      next: commts => this.commentsRest = commts,
      error: error => console.error(error)
    });

    this.isCommented = this.commentsRest.some(u => u.user?.id === this.userLogged.id )

    this.commentControl = this.fb.control('', [
      Validators.required
    ]);

    this.commentForm = this.fb.group({
      textForm: this.commentControl
    })

  }

  resetComment() {
    this.newComment = {
      stars: 0,
      text: '',
    }
  }

  addComment() {
    this.newComment.text = this.commentControl.value;
    this.newComment.stars = this.scoreSelected;
    this.score = this.scoreSelected;

    this.restaurantsService.addComment(this.restaurant.id as number,this.newComment)
    .subscribe({
      next: () => {
        this.saved = true;
        this.resetComment();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
    });
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: `Comment added`
        })
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

  getStarRating(stars: number): string {
    const resStart = 5 - stars;

    return '★'.repeat(stars) + '☆'.repeat(resStart);
  }

}
