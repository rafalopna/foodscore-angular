import { Route } from '@angular/router'
import { userResolver } from './resolvers/user.resolver'

export const USERS_ROUTES: Route[] = [
  {
    path: 'me',
    loadComponent: () =>
      import('./profile/profile.component').then((m) =>
        m.ProfileComponent),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./profile-form/profile-form.component').then((m) =>
        m.ProfileFormComponent)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./profile/profile.component').then((m) =>
        m.ProfileComponent),
    resolve: {
      user: userResolver
    }
  },
]
