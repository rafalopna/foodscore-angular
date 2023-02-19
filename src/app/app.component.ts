import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RestaurantsPageComponent } from './restaurants/restaurants-page/restaurants-page.component';

@Component({
  selector: 'fs-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RestaurantsPageComponent,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-foodscore';
}
