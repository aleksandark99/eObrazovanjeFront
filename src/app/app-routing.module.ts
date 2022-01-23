import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './components/course/course.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard'
import { NotSignedIn } from './guards/not-signed-in.guard'



const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent,canActivate:[NotSignedIn]}
  ,
   {path: 'register', component: RegisterComponent,canActivate:[NotSignedIn]},
   {path: 'courses', component: CourseComponent},


  //,
  // {path: 'add-student-to-course', component: AddStudentToCourseComponent,canActivate:[AuthGuard]},
  // {path: 'add-professor-to-course', component: AddProfessorToCourseComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
