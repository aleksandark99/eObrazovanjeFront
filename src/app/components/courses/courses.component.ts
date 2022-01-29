import { Component, OnInit } from "@angular/core";
import { CourseService } from "src/app/api";
import { CourseResponse } from "src/app/model/courseResponse";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { Pagination } from "src/app/model/pagination";
@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./coures.style.scss"],
})
export class CoursesComponent implements OnInit {
  courses: CourseResponse[] = [];
  pagination: Pagination = new Pagination();
  searchWord = "";
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  //  METHODS METHODS METHODS METHODS METHODS METHODS METHODS
  pageChanged(event: PageChangedEvent): void {
    this.pagination.page = event.page;
  }

  getNextPage() {
    this.courseService.getCourses(this.pagination.currentPage - 1, this.searchWord, 5, "response").subscribe((coursesResponse) => {
      this.courses = coursesResponse.body;
    });
  }

  searchCourses(searchModel) {
    if (this.searchForm.valid) {
      this.pagination.resetPagination();
      this.searchWord = this.searchModel.search;
      this.courseService.getCourses(0, this.searchWord, 5, "response").subscribe((coursesResponse) => {
        this.courses = coursesResponse.body;
        this.pagination.setPaginationFromHeaders(coursesResponse.headers);
      });
    }
  }

  // also for resetting search
  loadCourses() {
    this.searchModel = {};
    this.searchWord = "";
    this.pagination.resetPagination();
    this.courseService.getCourses(0, null, 5, "response").subscribe((coursesResponse) => {
      this.courses = coursesResponse.body;
      this.pagination.setPaginationFromHeaders(coursesResponse.headers);
    });
  }

  createNewCourse(model) {
    if (this.form.valid) {
      this.courseService.createCourse(this.model, "response").subscribe((response) => {
        if (response.status != 201) alert("something wnet wrong try again later");
        else {
          this.options.resetModel();
          alert("course added");
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
      className: "section-label",
      template: "<hr /><div><strong>Create new course:</strong></div>",
    },
    {
      fieldGroupClassName: "row",
      fieldGroup: [
        {
          className: "col-3",
          type: "input",
          key: "name",
          templateOptions: {
            label: "Name",
            required: true,
          },
        },
        {
          className: "col-3",
          type: "input",
          key: "ects",
          templateOptions: {
            type: "number",
            label: "ECTS",
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
          className: "col-3",
          type: "input",
          key: "search",
          templateOptions: {
            placeholder: "name or code",
            required: true,
          },
        },
      ],
    },
  ];
}
