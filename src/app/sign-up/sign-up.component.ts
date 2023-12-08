import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.less'
})
export class SignUpComponent implements OnInit {
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
    console.log(`Email: ${this.profileForm.value.email}`);
    console.log(`Password: ${this.profileForm.value.password}`);
    console.log(`Password Again: ${this.profileForm.value.passwordAgain}`);
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