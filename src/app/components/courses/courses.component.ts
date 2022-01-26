import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'})
export class CoursesComponent implements OnInit {

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses(0,10).subscribe((courses) => (console.log(courses)));
  }

}
