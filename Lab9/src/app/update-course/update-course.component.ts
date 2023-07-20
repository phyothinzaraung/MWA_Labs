import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['../signin/signin.component.css']
})
export class UpdateCourseComponent {
  course = {
    code: '',
    title: ''
  };

  course_id: string = '';

  data: any;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.data = params;
      this.course.code = this.data.code;
      this.course.title = this.data.title;
      this.course_id = this.data.courseId;
    });
  }

  updateCourse(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getAuthorizationHeader()
    });

    this.http.put(`http://localhost:3000/courses/${this.course_id}`, this.course, { headers }).subscribe(
      (response) => {
        console.log('Course updated successfully');
        console.log(response);
        this.router.navigate(['/courses'])
      },
      (error) => {
        console.log('Course update error');
        console.log(error);
      }
    );
  }
}
