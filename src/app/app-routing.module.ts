import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { CourseInstancesComponent } from './components/course-instances/course-instances.component';
import { CoursesComponent } from './components/courses/courses.component';
import { DocumentComponent } from './components/document/document.component';
import { EnrollemntsComponent } from './components/enrollemnts/enrollemnts.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { LoginComponent } from './components/login/login.component';
import { MyLecturesComponent } from './components/my-lectures/my-lectures.component';
import { MyTestsComponent } from './components/my-tests/my-tests.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterForTestComponent } from './components/register-for-test/register-for-test.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentsComponent } from './components/students/students.component';
import { TestInstancesComponent } from './components/test-instances/test-instances.component';
import { TestsComponent } from './components/tests/tests.component';
import { AuthGuard } from './guards/auth.guard'
import { NotSignedIn } from './guards/not-signed-in.guard'



const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent,canActivate:[NotSignedIn]},
  {path: 'register', component: RegisterComponent,canActivate:[NotSignedIn]},
  {path: 'courses', component: CoursesComponent,canActivate:[AuthGuard]},
  {path: 'students', component: StudentsComponent,canActivate:[AuthGuard]},
  {path: 'course-instances', component: CourseInstancesComponent,canActivate:[AuthGuard]},
  {path: 'account', component: AccountComponent,canActivate:[AuthGuard]},
  {path: 'students', component: StudentsComponent,canActivate:[AuthGuard]},
  {path: 'lecturers', component: LecturerComponent,canActivate:[AuthGuard]},
  {path: 'enrollments', component: EnrollemntsComponent,canActivate:[AuthGuard]},
  {path: 'register-test', component: RegisterForTestComponent,canActivate:[AuthGuard]},
  {path: 'lecturers', component: LecturerComponent,canActivate:[AuthGuard]},
  {path: 'enrollments', component: EnrollemntsComponent,canActivate:[AuthGuard]},
  {path: 'documents', component: DocumentComponent,canActivate:[AuthGuard]},
  {path: 'student', component: ProfileComponent,canActivate:[AuthGuard]},
  {path: 'lecturer', component: ProfileComponent,canActivate:[AuthGuard]},
  {path: 'my-tests', component: MyTestsComponent,canActivate:[AuthGuard]},
  {path: 'my-lecture-instances', component: MyLecturesComponent,canActivate:[AuthGuard]},
  {path: 'course-tests', component: TestsComponent,canActivate:[AuthGuard]},
  {path: 'tests', component: TestInstancesComponent,canActivate:[AuthGuard]},



  
  // {path: 'add-student-to-course', component: AddStudentToCourseComponent,canActivate:[AuthGuard]},
  // {path: 'add-professor-to-course', component: AddProfessorToCourseComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
