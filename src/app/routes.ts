import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
  { path: 'maps', loadComponent: () =>
    import('./maps/arcgis-map/arcgis-map.component').then((m) =>
    m.ArcgisMapComponent
    ),
  },
  {
    path: 'auth', loadChildren: () =>
      import('./auth/routes').then(m =>
        m.LOGIN_ROUTES)
  },
  { path: 'restaurants', loadChildren: () =>
      import('./restaurants/routes').then(m =>
        m.RESTAURANT_ROUTES)
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },


]
