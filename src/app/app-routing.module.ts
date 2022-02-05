import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseInstancesComponent } from './components/course-instances/course-instances.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentsComponent } from './components/students/students.component';
import { AuthGuard } from './guards/auth.guard'
import { NotSignedIn } from './guards/not-signed-in.guard'



const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent,canActivate:[NotSignedIn]},
  {path: 'register', component: RegisterComponent,canActivate:[NotSignedIn]},
  {path: 'courses', component: CoursesComponent,canActivate:[NotSignedIn]},
  {path: 'students', component: StudentsComponent,canActivate:[NotSignedIn]},
  {path: 'course-instances', component: CourseInstancesComponent,canActivate:[NotSignedIn]},
  {path: 'lecturers', component: LecturerComponent,canActivate:[NotSignedIn]},
  {path: 'student', component: ProfileComponent,canActivate:[NotSignedIn]},
  {path: 'lecturer', component: ProfileComponent,canActivate:[NotSignedIn]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
