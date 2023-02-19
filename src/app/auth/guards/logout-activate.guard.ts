import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';


@Injectable()
export class LogoutActivateGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLogged = this.authService.isLogged();
    if (isLogged) {
      this.router.navigate(['/restaurants']);
    }
    return !isLogged;
  }
}
