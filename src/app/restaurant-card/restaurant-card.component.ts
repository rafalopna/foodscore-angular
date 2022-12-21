import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';

@Component({
  selector: 'fs-restaurant-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent {

  readonly days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  today = new Date(Date.now()).toDateString().split(" ")[0];
  weekDay: number = this.days.indexOf(this.today);
  daysOpen: boolean[] = (new Array(7)).fill(true);
  @Input() restaurant!: Restaurant;

  @Output() deleted = new EventEmitter<void>();


  deleteRestaurant() {
    this.deleted.emit();
  }

}
