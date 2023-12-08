import { Injectable } from '@angular/core';
import { Credentials } from '../models/credentials';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  submitCredentials(creds: Credentials): void {
    console.log(creds);
  }
}
