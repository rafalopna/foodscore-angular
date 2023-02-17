/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OneCheckedDirective } from 'src/app/shared/validators/one-checked.directive';
import { UserLogin, UserSocialLogin } from '../interfaces/user';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { GoogleLoginDirective } from 'src/app/google-login/google-login.directive';
import { FbLoginDirective } from 'src/app/facebook-login/fb-login.directive';
import { ArcgisMapComponent } from 'src/app/maps/arcgis-map/arcgis-map.component';
import { ArcgisMarkerDirective } from 'src/app/maps/arcgis-marker/arcgis-marker.directive';
import { ArcgisSearchDirective } from 'src/app/maps/arcgis-search/arcgis-search.directive';
import { SearchResult } from 'src/app/maps/interfaces/search-result';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OneCheckedDirective,
    GoogleLoginDirective,
    FbLoginDirective,
    FontAwesomeModule,
    ArcgisMapComponent,ArcgisMarkerDirective,ArcgisSearchDirective
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  icons = { faGoogle, faFacebook };

  user!: UserLogin;
  userSocial!: UserSocialLogin;

  logForm!: FormGroup;
  emailControl!: FormControl<string>;
  passwordControl!: FormControl<string>;
  latControl!: FormControl<number>;
  lngControl!: FormControl<number>;
  addres!: string;
  latitude!: number;
  longitude!: number;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ){
    this.resetUser();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Login user");

    navigator.geolocation.getCurrentPosition(pos => {
      this.latControl.setValue(pos.coords.latitude);
      this.lngControl.setValue(pos.coords.longitude);
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    });

    this.emailControl = this.fb.control('', [
      Validators.required
    ])

    this.passwordControl = this.fb.control('', [
      Validators.required
    ])

    this.latControl = this.fb.control(0, [
      Validators.required
    ])

    this.lngControl = this.fb.control(0, [
      Validators.required
    ])

    this.logForm = this.fb.group({
      email: this.emailControl,
      password: this.passwordControl,
      lat: this.latControl,
      lng: this.lngControl
    })
  }

  resetUser() {
    this.user = {
      email: '',
      password: '',
      lat: 0,
      lng: 0
    }
    this.userSocial = {
      token: '',
      lat: 0,
      lng: 0
    }
  }

  loginUser() {
    this.user.email = this.emailControl.value;
    this.user.password = this.passwordControl.value;
    this.user.lat = this.latControl.value;
    this.user.lng = this.lngControl.value;

    this.authService.login(this.user)
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'You are login!'
        }).then(() => {
          this.router.navigate(['/restaurants']);
        })
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Oh nooo!',
          text: 'Try again!' + error
      })
      }
    })
  }

  loggedGoogle(user: gapi.auth2.GoogleUser) {
    this.userSocial.token = user.getAuthResponse().id_token;
    this.userSocial.lat = this.latControl.value;
    this.userSocial.lng = this.lngControl.value;

    this.authService.loginGoogle(this.userSocial)
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'You are login!'
        }).then(() => {
          this.router.navigate(['/restaurants']);
        })
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Oh nooo!',
          text: 'Try again!' + error
      })
      }
    })
  }

  loggedFacebook(resp: fb.StatusResponse) {
    console.log(resp.authResponse.accessToken);
    this.userSocial.token = resp.authResponse.accessToken;
    this.userSocial.lat = this.latControl.value;
    this.userSocial.lng = this.lngControl.value;

    this.authService.loginFacebook(this.userSocial)
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'You are login!'
        }).then(() => {
          this.router.navigate(['/restaurants']);
        })
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Oh nooo!',
          text: 'Try again!' + error
      })
      }
    })
  }

  showError(error: any) {
    console.error(error);
  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    };
  }

  searchResult (result: SearchResult) {
    this.addres = result.address;
    this.latitude = result.latitude;
    this.longitude = result.longitude;
  }
}
