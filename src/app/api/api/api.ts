export * from './course.service';
import { CourseService } from './course.service';
export * from './pet.service';
import { PetService } from './pet.service';
export const APIS = [CourseService, PetService];
