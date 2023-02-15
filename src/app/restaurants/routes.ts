import { Route } from "@angular/router";
import { leavePageGuard } from "./guards/leave-page.guard";
import { restaurantIdGuard } from "./guards/restaurant-id.guard";
import { restaurantResolver } from "./resolvers/restaurant.resolver";

export const RESTAURANT_ROUTES: Route[] = [
  {
    path: '', loadComponent: () =>
      import('./restaurants-page/restaurants-page.component').then((m) =>
        m.RestaurantsPageComponent
        ),
  },
  { path: 'add',
    canDeactivate: [leavePageGuard],
    loadComponent: () =>
      import('./restaurant-form/restaurant-form.component').then((m) =>
        m.RestaurantFormComponent
        ),
  },
  { path: ':id',
    canActivate: [restaurantIdGuard],
    loadComponent: () =>
      import('./restaurant-details/restaurant-details.component').then((m) =>
        m.RestaurantDetailsComponent),
    resolve: {
      restaurant: restaurantResolver,
    }
  },


]
