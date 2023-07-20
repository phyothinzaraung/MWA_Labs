import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.signupForm = this.formBuilder.group({
      first: [''],
      last: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      hobbies: ['']
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signUpData: SignUpData = {
        name: {
          first: this.signupForm.value.first,
          last: this.signupForm.value.last
        },
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        hobbies: this.signupForm.value.hobbies ? this.signupForm.value.hobbies.split(',') : []
      };

      console.log(signUpData);
  
      this.http.post('http://localhost:3000/auth/signup', signUpData).subscribe(
        (response) => {
          console.log('Sign-up successful');
          console.log(response);
        },
        (error) => {
          console.log('Sign-up error');
          console.log(error);
        }
      );
    }
  }
}

interface SignUpData {
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
  hobbies: string[];
}
