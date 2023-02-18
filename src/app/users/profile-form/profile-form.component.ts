import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/auth/interfaces/user';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileAvatar, ProfileData, ProfilePassword } from '../interfaces/profile';
import Swal from 'sweetalert2';
import { OneCheckedDirective } from 'src/app/shared/validators/one-checked.directive';
import { passwordMatchValidator } from 'src/app/shared/validators/password-match.validator';

@Component({
  selector: 'fs-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OneCheckedDirective,
    RouterLink
  ],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  user!: User;
  saved = false;
  newImage = false;
  imageName = '';
  profileData!: ProfileData;
  profileAvatar!: ProfileAvatar;
  profilePassword!: ProfilePassword;

  profileForm!: FormGroup;
  nameControl!: FormControl<string>;
  emailControl!: FormControl<string>;

  avatarForm!: FormGroup;
  avatarControl!: FormControl<string>;

  passwordForm!: FormGroup;
  pass1Control!: FormControl<string>;
  pass2Control!: FormControl<string>;

  constructor(
    private titleService: Title,
    private router: Router,
    private userService: UserService,
    private fb: NonNullableFormBuilder
  ) {
    this.resetForms();
  }

  ngOnInit(): void {
    this.titleService.setTitle("Edit profile");
    this.saved = false;

    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.nameControl.setValue (user.name);
      this.emailControl.setValue(user.email);
      this.profileAvatar.avatar = user.avatar;
    });

    this.nameControl = this.fb.control('', [
      Validators.required
    ]);
    this.emailControl = this.fb.control('', [
      Validators.required
    ]);

    this.avatarControl = this.fb.control('', [
      Validators.required
    ]);

    this.pass1Control = this.fb.control('', [
      Validators.required,
      Validators.minLength(4)
    ]);

    this.pass2Control = this.fb.control('', [
      Validators.required,
      Validators.minLength(4)
    ]);

    this.profileForm = this.fb.group({
      email: this.emailControl,
      name: this.nameControl
    });

    this.avatarForm = this.fb.group({
      imageForm: this.avatarForm
    })

    this.passwordForm = this.fb.group({
      password1: this.pass1Control,
      password2: this.pass2Control
    }, {
      validators: passwordMatchValidator
    });
  }

  resetForms() {
    this.profileData = {
      name: '',
      email: ''
    }
    this.profileAvatar = {
      avatar: ''
    }
    this.profilePassword = {
      password: ''
    }
  }

  updateProfile() {
    this.profileData.name = this.nameControl.value;
    this.profileData.email = this.emailControl.value;

    this.userService.putData(this.profileData)
    .subscribe({
      next: () => {
        this.saved = true;
        this.router.navigate(['/users/me']);
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: `Profile updated`
        })
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: error.error.message
        })
      }
    })
  }

  updateAvatar(){
    if(this.avatarForm.valid) {
      this.userService.putImage(this.profileAvatar)
      .subscribe({
        next: () => {
          this.saved = true;
          this.router.navigate(['/users/me']);
          Swal.fire({
            icon: 'success',
            title: 'Great!',
            text: `Image avatar updated`
          })
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Ooops...',
            text: error.error.message
          })
        }
      })
    }
  }

  updatPassword(){
    this.profilePassword.password = this.pass1Control.value;

    this.userService.putPassword(this.profilePassword)
    .subscribe({
      next: () => {
        this.saved = true;
        this.router.navigate(['/users/me']);
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: `Password changed`
        })
      },
      error: error => {
        Swal.fire({
          icon: 'error',
          title: 'Ooops...',
          text: error.error.message
        })
      }
    })
  }

  changeImage(fileInput: HTMLInputElement) {
    if(!fileInput.files || fileInput.files.length === 0)
    {
      return;
    }

    this.newImage = true;
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);

    reader.addEventListener('loadend', () => {
      this.profileAvatar.avatar = reader.result as string;
    });
  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid
    };
  }

}
