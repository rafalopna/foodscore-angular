import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fs-restaurant-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent {

  readonly days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  daysOpen: boolean[] = (new Array(7)).fill(true);
  today = new Date(Date.now()).toDateString().split(" ")[0];
  weekDay: number = this.days.indexOf(this.today);
  imageName = '';
  newRestaurant!: Restaurant;

  constructor() {
    this.resetRestaurant();
  }

  resetRestaurant() {
    this.newRestaurant  = {
      name: '',
      image: '',
      cuisine: '',
      description: '',
      phone: '',
      daysOpen: []
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
    this.newRestaurant.daysOpen = this.daysOpen.map((open,i) => open ? String(i) : '').filter(day => day !== '');
    this.insert.emit(this.newRestaurant);

    this.resetRestaurant();
    this.imageName = '';

  }

}
