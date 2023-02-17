import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/services/auth-service';

@Component({
  selector: 'fs-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isLogged = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ){
    this.authService.loginChange$.subscribe(userLogged => {
      this.isLogged = userLogged;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
