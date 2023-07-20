import { Component } from '@angular/core';
import { Course } from './course.model';
import { CourseService } from './course.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  template: `
  <div class="container">
    <h2>Course List</h2>
    <button class="logout-button" (click)="logout()">Logout</button>
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let course of courses">
          <td>{{ course.code }}</td>
          <td>{{ course.title }}</td>
          <td>
            <button (click)="addCourse()">Add</button>
            <button (click)="updateCourse(course._id, course.code, course.title)">Edit</button>
            <button (click)="deleteCourse(course._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styles: [`
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 8px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }

  button {
    padding: 4px 8px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    cursor: pointer;
    margin: 8px;
  }

  .container {
  position: relative;
}

  .logout-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
`]
})
export class CoursesComponent {
  courses: Course[] = []

  constructor(private courseService: CourseService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  deleteCourse(courseId: string) {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.courses = this.courses.filter(course => course._id !== courseId);
    });
  }

  addCourse(){
    this.router.navigate(['/add-course']);
  }

  updateCourse(courseId: string, code: string, title: string){
    const data = {courseId, code, title};
    this.router.navigate(['/update-course'], { queryParams: data });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

}
