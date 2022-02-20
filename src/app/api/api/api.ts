export * from './accountController.service';
import { AccountControllerService } from './accountController.service';
export * from './authenticationController.service';
import { AuthenticationControllerService } from './authenticationController.service';
export * from './courseController.service';
import { CourseControllerService } from './courseController.service';
export * from './courseInstanceController.service';
import { CourseInstanceControllerService } from './courseInstanceController.service';
export * from './enrollmentController.service';
import { EnrollmentControllerService } from './enrollmentController.service';
export * from './examPeriodController.service';
import { ExamPeriodControllerService } from './examPeriodController.service';
export * from './lecturerController.service';
import { LecturerControllerService } from './lecturerController.service';
export * from './profileController.service';
import { ProfileControllerService } from './profileController.service';
export * from './studentController.service';
import { StudentControllerService } from './studentController.service';
export const APIS = [AccountControllerService, AuthenticationControllerService, CourseControllerService, CourseInstanceControllerService, EnrollmentControllerService, ExamPeriodControllerService, LecturerControllerService, ProfileControllerService, StudentControllerService];
