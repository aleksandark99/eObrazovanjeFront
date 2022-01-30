import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CourseInstanceResponse, CourseInstanceService } from "src/app/api";
import { Pagination } from "src/app/model/pagination";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { Router } from "@angular/router";
import {Location} from '@angular/common'; 

@Component({
  selector: "app-course-instances",
  templateUrl: "./course-instances.component.html",
  styleUrls: ["./course-instances.component.scss"],
})
export class CourseInstancesComponent implements OnInit {
  courseId: number = 1;
  courseInstances: CourseInstanceResponse[] = [];
  pagination: Pagination = new Pagination();
  searchWord = "";

  constructor(private route: ActivatedRoute, private courseInstancesService: CourseInstanceService, private location: Location) {
    this.route.queryParams.subscribe((params) => {
      this.courseId = params.courseId;
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  //  METHODS METHODS METHODS METHODS METHODS METHODS METHODS
  pageChanged(event: PageChangedEvent): void {
    this.pagination.page = event.page;
  }

  getNextPage() {
    this.courseInstancesService.getCourseInstances(this.courseId, this.pagination.currentPage - 1, this.searchWord, 5, "response").subscribe((coursesResponse) => {
      this.courseInstances = coursesResponse.body;
    });
  }

  searchCourses(searchModel) {
    if (this.searchForm.valid) {
      this.pagination.resetPagination();
      this.searchWord = this.searchModel.search;
      this.courseInstancesService.getCourseInstances(this.courseId, 0, this.searchWord, 5, "response").subscribe((coursesResponse) => {
        this.courseInstances = coursesResponse.body;
        this.pagination.setPaginationFromHeaders(coursesResponse.headers);
      });
    }
  }

  // also for resetting search
  loadCourses() {
    this.searchModel = {};
    this.searchWord = "";
    this.pagination.resetPagination();
    this.courseInstancesService.getCourseInstances(this.courseId, 0, this.searchWord, 5, "response").subscribe((coursesResponse) => {
      this.courseInstances = coursesResponse.body;
      this.pagination.setPaginationFromHeaders(coursesResponse.headers);
    });
  }

  reset() {
    this.courseId=null;
    this.location.replaceState("/coures-instances")
    this.loadCourses();
  }

  //FORMS
  form = new FormGroup({});
  searchForm = new FormGroup({});
  searchModel: any = {};
  model: any = {};
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
