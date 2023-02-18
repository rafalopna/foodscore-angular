import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../interfaces/restaurant';
import Swal from 'sweetalert2';

@Component({
  selector: 'fs-restaurant-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent {

  readonly days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  today = new Date(Date.now()).toDateString().split(" ")[0];
  weekDay: number = this.days.indexOf(this.today);
  daysOpen: boolean[] = (new Array(7)).fill(true);
  @Input() restaurant!: Restaurant;
  @Input() isDetail!: boolean;

  @Output() deleted = new EventEmitter<void>();

  deleteRestaurant() {
    this.deleted.emit();
  }

  confirmDeleted() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleted.emit();
      }
    })
  }
}
