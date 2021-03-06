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
import { AccountComponent } from './components/account/account.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { DocumentComponent } from './components/document/document.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EnrollemntsComponent } from './components/enrollemnts/enrollemnts.component';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';
import { RegisterForTestComponent } from './components/register-for-test/register-for-test.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { DatePipe } from './utils/pipe-date';
import { MyTestsComponent } from './components/my-tests/my-tests.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MyLecturesComponent } from './components/my-lectures/my-lectures.component';
import { TestsComponent } from './components/tests/tests.component';
import { TestInstancesComponent } from './components/test-instances/test-instances.component';

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
    LecturerComponent,
    DocumentComponent,
    ProfileComponent,
    LecturerComponent,
    EnrollemntsComponent,
    AccountComponent,
    EnrollmentComponent,
    RegisterForTestComponent,
    DatePipe,
    MyTestsComponent,
    MyLecturesComponent,
    TestsComponent,
    TestInstancesComponent
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
    FormlyBootstrapModule,
    SelectDropDownModule,
    ModalModule.forRoot(),
  
    CollapseModule,
    BsDatepickerModule.forRoot()
    
  
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
