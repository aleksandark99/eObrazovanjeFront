export * from './course.service';
import { CourseService } from './course.service';
export * from './courseInstance.service';
import { CourseInstanceService } from './courseInstance.service';
export * from './pet.service';
import { PetService } from './pet.service';
export const APIS = [CourseService, CourseInstanceService, PetService];
