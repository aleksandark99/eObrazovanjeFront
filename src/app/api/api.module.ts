import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AccountControllerService } from './api/accountController.service';
import { AuthenticationControllerService } from './api/authenticationController.service';
import { CourseControllerService } from './api/courseController.service';
import { CourseInstanceControllerService } from './api/courseInstanceController.service';
import { DocumentControllerService } from './api/documentController.service';
import { EnrollmentControllerService } from './api/enrollmentController.service';
import { ExamPeriodControllerService } from './api/examPeriodController.service';
import { LecturerControllerService } from './api/lecturerController.service';
import { ProfileControllerService } from './api/profileController.service';
import { StudentControllerService } from './api/studentController.service';
import { TestControllerService } from './api/testController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
