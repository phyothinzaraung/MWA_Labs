import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = "http://localhost:3000/courses"

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  deleteCourse(courseId: string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${courseId}`)
  }
}
