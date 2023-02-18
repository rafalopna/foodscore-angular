import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormArray, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';
import Swal from 'sweetalert2';
import { OneCheckedDirective } from 'src/app/shared/validators/one-checked.directive';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from 'src/app/users/services/user.service';

@Component({
  selector: 'fs-restaurant-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OneCheckedDirective
  ],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {

  readonly days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  daysOpen: boolean[] = (new Array(7)).fill(true);
  today = new Date(Date.now()).toDateString().split(" ")[0];
  weekDay: number = this.days.indexOf(this.today);
  imageName = '';
  newRestaurant!: Restaurant;
  userCreator!: User;
  saved = false;
  confirmed = false;

  restForm!: FormGroup;
  nameControl!: FormControl<string>;
  descControl!: FormControl<string>;
  cuisineControl!: FormControl<string>;
  daysControl!: FormArray;
  phoneControl!: FormControl<string>;
  imageControl!: FormControl<string>;

  constructor(
    private titleService: Title,
    private router: Router,
    private restaurantService: RestaurantsService,
    private userService: UserService,
    private fb: NonNullableFormBuilder
    ) {
    this.resetRestaurant();
  }

  ngOnInit(): void {
    this.titleService.setTitle("New Restaurant");
    this.saved = false;

    this.userService.getUser().subscribe((user) => {
      this.userCreator = user;
    })

    this.nameControl = this.fb.control('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z][a-zA-Z ]*$/),
    ]);
    this.descControl = this.fb.control('',[
      Validators.required
    ]);
    this.cuisineControl = this.fb.control('', [
      Validators.required
    ]);
    this.daysControl = this.fb.array([], [
      Validators.required
    ]);
    this.phoneControl = this.fb.control('', [
      Validators.required,
      Validators.pattern(/([+0]?[0-9]{2} ?)?[0-9]{9}/),
    ]);
    this.imageControl = this.fb.control('', [
      Validators.required
    ]);

    for(let i=0; i<7;i++){
      this.daysControl.push(this.fb.control(false));
    }

    this.restForm = this.fb.group({
      nameForm: this.nameControl,
      descForm: this.descControl,
      cuisineForm: this.cuisineControl,
      daysForm: this.daysControl,
      phoneForm: this.phoneControl,
      imageForm: this.imageControl,
    })

  }

  canDeactivate() {
    this.confirmed = true;
    if(this.restForm.dirty && !this.saved) {
      this.confirmed = confirm('Do you want to leave this page?. Changes can be lost');
    }

    return this.saved || this.confirmed
  }

  resetRestaurant() {
    this.newRestaurant  = {
      name: '',
      image: '',
      cuisine: '',
      description: '',
      phone: '',
      daysOpen: [],
      address: '',
      lat: 0,
      lng: 0,
      creator: this.userCreator,
      distance: 0,
      stars: 0,
      mine: false
    };
    this.daysOpen = (new Array(7)).fill(true);
  }

  changeImage(fileInput: HTMLInputElement) {
    if(!fileInput.files || fileInput.files.length === 0)
    {
      return;
    }

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);

    reader.addEventListener('loadend', () => {
      this.newRestaurant.image = reader.result as string;
    });
  }

  @Output() insert = new EventEmitter<Restaurant>();

  addRestaurant() {
    this.newRestaurant.name = this.nameControl.value;
    this.newRestaurant.description = this.descControl.value;
    this.newRestaurant.cuisine = this.cuisineControl.value;
    this.newRestaurant.daysOpen = this.daysControl.value
    this.newRestaurant.daysOpen = this.newRestaurant.daysOpen.map((open,i) =>
      open ? String(i) : '').filter(day => day !== '');
    this.newRestaurant.phone = this.phoneControl.value;
    this.restaurantService.addRestaurant(this.newRestaurant)
    .subscribe({
      next: () => {
        this.saved = true;
        this.resetRestaurant();
        this.imageName = '';
        this.router.navigate(['/restaurants']);
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: `Restaurant added`
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

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    };
  }
}
