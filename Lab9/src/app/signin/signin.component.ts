import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const signInData = {
        email: this.signinForm.value.email,
        password: this.signinForm.value.password
      };
  
      this.http.post<SigninResponse>('http://localhost:3000/auth/signin', signInData).subscribe(
        (response) => {
          console.log('Sign-in successful');
          console.log(response);
          const token = response.data;
          localStorage.setItem('accessToken', token);
          this.router.navigate(['/courses'])
        },
        (error) => {
          console.log('Sign-in error');
          console.log(error);
        }
      );
    }
  }
}

interface SigninResponse {
  success: boolean;
  data: string;
}
