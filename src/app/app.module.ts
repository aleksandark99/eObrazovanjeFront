import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './shared/interceptor.service';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { CoursesComponent } from './components/courses/courses.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CourseInstanceComponent } from './components/course-instance/course-instance.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { StudentsComponent } from './components/students/students.component';
import { CourseInstancesComponent } from './components/course-instances/course-instances.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    CourseInstanceComponent,
    StudentsComponent,
    CourseInstancesComponent,
    LecturerComponent
  ],
  imports: [
    PaginationModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgxNavbarModule,
    ButtonsModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
