import { Route } from "@angular/router";

export const LOGIN_ROUTES: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login-page/login-page.component').then((m) =>
        m.LoginPageComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) =>
        m.RegisterComponent)
  }
]
