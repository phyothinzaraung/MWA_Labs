import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  template: `
    <h2>Course List</h2>
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
            <button (click)="deleteCourse(course._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
   
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
  }
`]
})
export class CourseListComponent implements OnInit {

  courses: Course[] = []

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      console.log(this.courses)
    });
  }

  deleteCourse(courseId: string) {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.courses = this.courses.filter(course => course._id !== courseId);
    });
  }

}
