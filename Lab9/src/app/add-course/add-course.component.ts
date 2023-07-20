import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['../signin/signin.component.css']
})
export class AddCourseComponent {
  course = {
    code: '',
    title: ''
  };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router){}

  addCourse() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getAuthorizationHeader()
    });

    this.http.post('http://localhost:3000/courses', this.course, { headers }).subscribe(
      (response) => {
        console.log('Course added successfully');
        console.log(response);
        this.router.navigate(['/courses'])
      },
      (error) => {
        console.log('Course addition error');
        console.log(error);
      }
    );
  }
}
