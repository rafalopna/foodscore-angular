import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RestaurantsPageComponent } from "./restaurants/restaurants-page/restaurants-page.component";
import { ProfileComponent } from './users/profile/profile.component';

@NgModule({
    declarations: [
  
    ProfileComponent
  ],
    providers: [],
    bootstrap: [],
    imports: [
        BrowserModule,
        RestaurantsPageComponent,
        RouterModule
    ]
})
export class AppModule { }
