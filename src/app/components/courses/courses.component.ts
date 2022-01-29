import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/api';
import { CourseResponse } from 'src/app/model/courseResponse';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./coures.style.scss'],
})
export class CoursesComponent implements OnInit {
  courses: CourseResponse[] = [];
  currentPage: any = 0;
  page?: any = 0;
  totalItems: any = 0;
  itemsPerPage = 5;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService
      .getCourses(0, 5, 'response')
      .subscribe((coursesResponse) => {
        this.courses = coursesResponse.body;
        this.currentPage = coursesResponse.headers.get('Page');
        // this.page=coursesResponse.headers.get("Page");
        this.totalItems = coursesResponse.headers.get('Total-Elements');
      });
    console.log('AAA');
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
  }

  getNextPage() {
    this.courseService
      .getCourses(this.currentPage - 1, 5, 'response')
      .subscribe((coursesResponse) => {
        this.courses = coursesResponse.body;
      });
  }

  form = new FormGroup({});


  model: any = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      className: 'section-label',
      template: '<hr /><div><strong>Create new course:</strong></div>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'Name',
          templateOptions: {
            label: 'Name',
            required: true
          },
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'ECTS',
          templateOptions: {
            type: 'number',
            label: 'ECTS',
            max: 12,
            min: 1,
            required: true
          },
        },
      ],
    },
  ];

  createNewCourse(model) {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
