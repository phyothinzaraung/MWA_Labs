import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from '../signup/signup.component';
import { SigninComponent } from '../signin/signin.component';
import { CoursesComponent } from '../courses/courses.component';
import { AuthGuard } from '../auth-guard.service';
import { AddCourseComponent } from '../add-course/add-course.component';
import { UpdateCourseComponent } from '../update-course/update-course.component';

const routes: Routes = [
  {path: 'signup', component: SignupComponent },
  {path: 'signin', component: SigninComponent},
  {path: 'courses', component: CoursesComponent, canActivate: [AuthGuard]},
  {path: 'add-course', component: AddCourseComponent},
  {path: 'update-course', component: UpdateCourseComponent},
  {path: '', redirectTo: "/signin", pathMatch: 'full'},
  {path: '**', redirectTo: "/signin"}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
