import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RestaurantsPageComponent } from "./restaurants/restaurants-page/restaurants-page.component";
import { ProfileComponent } from './users/profile/profile.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { ProfileFormComponent } from './users/profile-form/profile-form.component';

@NgModule({
    declarations: [
  
    ProfileComponent,
       UserFormComponent,
       ProfileFormComponent
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
