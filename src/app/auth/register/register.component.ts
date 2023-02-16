import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { OneCheckedDirective } from 'src/app/shared/validators/one-checked.directive';
import { AuthService } from '../services/auth-service';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OneCheckedDirective
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  imageName = '';
  newUser!: User;
  saved = false;

  regForm!: FormGroup;
  nameControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  email2Control!: FormControl<string>;
  passwordControl!: FormControl<string>;
  latControl!: FormControl<number>;
  lngControl!: FormControl<number>;
  imageControl!: FormControl<string>;

  constructor(
    private titleService: Title,
    private router: Router,
    private authService: AuthService,
    private fb: NonNullableFormBuilder
  ){
    this.resetUser();
    this.newUser.lat = 0.372453452;
    this.newUser.lng = -0.6553454;
  }

  ngOnInit(): void {
    this.titleService.setTitle("Register new user");
    this.saved = false;

    this.nameControl = this.fb.control('', [
      Validators.required
    ]);

    this.emailControl = this.fb.control('', [
      Validators.required
    ]);

    this.email2Control = this.fb.control('', [
      Validators.required
    ]);

    this.passwordControl = this.fb.control('', [
      Validators.required
    ])

    this.imageControl = this.fb.control('', [
      Validators.required
    ])

    this.latControl = this.fb.control(0, [
      Validators.required
    ])

    this.lngControl = this.fb.control(0, [
      Validators.required
    ])


    this.regForm = this.fb.group({
      name: this.nameControl,
      email: this.emailControl,
      email2: this.email2Control,
      password: this.passwordControl,
      lat: this.latControl,
      lng: this.lngControl,
      avatar: this.imageControl
    })
  }

  resetUser() {
    this.newUser = {
      name: '',
      email: '',
      password: '',
      avatar: '',
      lat: 0,
      lng: 0
    };
  }

  registerUser() {
    this.newUser.name = this.nameControl.value;
    this.newUser.email = this.emailControl.value;
    this.newUser.password = this.passwordControl.value;

    this.authService.addNewUser(this.newUser)
    .subscribe({
      next: () => {
        this.saved = true;
        this.resetUser();
        //this.imageName = '';
        this.router.navigate(['/login']);
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'User registered'
        })
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: error.error.message
        })
      }
    });
  }

  changeImage(fileInput: HTMLInputElement) {
    if(!fileInput.files || fileInput.files.length === 0)
    {
      return;
    }

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);

    reader.addEventListener('loadend', () => {
      this.newUser.avatar = reader.result as string;
    });
  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    };
  }
}




