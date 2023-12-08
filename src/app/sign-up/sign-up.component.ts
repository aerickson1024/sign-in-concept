import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { CreateUserService } from '../services/create-user.service';
import { Credentials } from '../models/credentials';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.less'
})
export class SignUpComponent implements OnInit {
  createUser: CreateUserService = inject(CreateUserService);
  profileForm: FormGroup;

  constructor() {
    this.profileForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      'passwordAgain': new FormControl('', Validators.compose([Validators.required]))
    }, this.passwordValidator());
  }

  ngOnInit(): void {}

  handleSubmit() {
    console.log('FORM SUBMITTED');

    const creds = new Credentials(this.profileForm.value.email, this.profileForm.value.password);
    this.createUser.submitCredentials(creds);
  }

  passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.profileForm?.value.password;
      const passwordAgain = this.profileForm?.value.passwordAgain;

      const areNotEqual = password != passwordAgain;
      return areNotEqual ? { 'areNotEqual': true } : null;
    }
  }
}