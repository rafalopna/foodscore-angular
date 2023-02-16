import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OneCheckedDirective } from 'src/app/shared/validators/one-checked.directive';
import { UserLogin } from '../interfaces/user';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { GoogleLoginDirective } from 'src/app/google-login/google-login.directive';
import { FbLoginDirective } from 'src/app/facebook-login/fb-login.directive';

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
    FontAwesomeModule
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  icons = { faGoogle, faFacebook };

  user!: UserLogin;

  logForm!: FormGroup;
  emailControl!: FormControl<string>;
  passwordControl!: FormControl<string>;
  latControl!: FormControl<number>;
  lngControl!: FormControl<number>;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private fb: NonNullableFormBuilder
  ){
    this.resetUser();
    this.user.lat = 0.372453452;
    this.user.lng = -0.6553454;

  }

  ngOnInit(): void {
    this.titleService.setTitle("Login user");

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
  }

  loginUser() {
    this.user.email = this.emailControl.value;
    this.user.password = this.passwordControl.value;

    this.authService.login(this.user)
    .subscribe({
      next: resp => {
        console.log(resp);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  loggedGoogle(user: gapi.auth2.GoogleUser) {
    console.log(user.getAuthResponse().id_token);
    console.log(user.getBasicProfile().getName());
    console.log(user.getBasicProfile().getEmail());
    console.log(user.getBasicProfile().getImageUrl());
  }

  loggedFacebook(resp: fb.StatusResponse) {
    console.log(resp.authResponse.accessToken);
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
}
