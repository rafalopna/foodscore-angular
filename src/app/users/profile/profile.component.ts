import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from '../services/user.service';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@Component({
  selector: 'fs-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ProfileFormComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  id!: number;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("User profile");

    this.id = this.route.snapshot.params["id"];

    this.userService.getUser(this.id).subscribe((user) => {
      this.user = user;
    });
  }
}
