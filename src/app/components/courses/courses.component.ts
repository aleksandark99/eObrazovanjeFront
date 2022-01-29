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
  searchWord="";
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses()
   }

  //  METHODS METHODS METHODS METHODS METHODS METHODS METHODS 
  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
  }

  getNextPage() {
    this.courseService
      .getCourses(this.currentPage - 1, this.searchWord, 5, 'response')
      .subscribe((coursesResponse) => {
        this.courses = coursesResponse.body;
      });
  }



  searchCourses(searchModel) {
    if(this.searchForm.valid){
      this.currentPage=0;
      this.searchWord=this.searchModel.search
      this.courseService
      .getCourses(0, this.searchWord, 5, 'response')
      .subscribe((coursesResponse) => {
        this.courses = coursesResponse.body;
        this.currentPage = coursesResponse.headers.get('Page');
        this.totalItems = coursesResponse.headers.get('Total-Elements');
      });
    }
  }

  loadCourses(){
    this.searchModel={};
    this.searchWord="";
    this.currentPage=0;
    this.courseService
      .getCourses(0, null, 5, 'response')
      .subscribe((coursesResponse) => {
        this.courses = coursesResponse.body;
        this.currentPage = coursesResponse.headers.get('Page');
        this.totalItems = coursesResponse.headers.get('Total-Elements');
      });

    
  }

  createNewCourse(model) {
    if (this.form.valid) {
      this.courseService
        .createCourse(this.model, 'response')
        .subscribe((response) => {
          if (response.status != 201)
            alert('something wnet wrong try again later');
          else {
            this.options.resetModel();
            alert('course added');
          }
        });
    }
  }
  // FORMS FORMS FORMS FORMS FORMS FORMS FORMS FORMS 
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
          key: 'name',
          templateOptions: {
            label: 'Name',
            required: true,
          },
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'ects',
          templateOptions: {
            type: 'number',
            label: 'ECTS',
            max: 12,
            min: 1,
            required: true,
          },
        },
      ],
    },
  ];

  searchForm = new FormGroup({});
  searchModel: any = {};
  searchFields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'search',
          templateOptions: {
            placeholder: 'name or code',
            required: true,
          },
        },
      ],
    },
  ];

}
