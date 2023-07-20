import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from './course.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = "http://localhost:3000/courses"

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCourses(): Observable<Course[]> {
    const headers = new HttpHeaders().set('Authorization', this.authService.getAuthorizationHeader());
    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      map(response => response.data)
    );
  }

  deleteCourse(courseId: string):Observable<any>{
    const headers = new HttpHeaders().set('Authorization', this.authService.getAuthorizationHeader());
    return this.http.delete(`${this.apiUrl}/${courseId}`, {headers})
  }
}
