import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard'
import { NotSignedIn } from './guards/not-signed-in.guard'
import {AddStudentToCourseComponent } from './components/add-student-to-course/add-student-to-course.component'
import { AddProfessorToCourseComponent} from './components/add-professor-to-course/add-professor-to-course.component'


const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent,canActivate:[NotSignedIn]},
  {path: 'register', component: RegisterComponent,canActivate:[NotSignedIn]},
  {path: 'add-student-to-course', component: AddStudentToCourseComponent,canActivate:[AuthGuard]},
  {path: 'add-professor-to-course', component: AddProfessorToCourseComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
