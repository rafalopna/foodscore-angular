import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'fs-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(
    private router: Router
  ){}

  logout() {
    localStorage.removeItem('access_token');

    Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'You are logout!'
        }).then(() => {
          this.router.navigate(['/']);
        })
  }

}
