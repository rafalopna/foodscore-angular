import { Route } from '@angular/router'

export const USERS_ROUTES: Route[] = [
  {
    path: 'me',
    loadComponent: () =>
      import('./profile/profile.component').then((m) =>
        m.ProfileComponent),
  },
]
