import { Component, OnInit } from "@angular/core";
import { CourseControllerService, CourseInstanceControllerService } from "src/app/api";
import { CourseResponse } from "src/app/model/courseResponse";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { Pagination } from "src/app/model/pagination";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { CourseInstanceService } from "src/app/api/api/courseInstance.service";


@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./coures.style.scss"],
})
export class CoursesComponent implements OnInit {
  courses: CourseResponse[] = [];
  pagination: Pagination = new Pagination();
  searchWord = "";
  selectedCourseName = "";
  selectedCourseId = -1;
  dateStart = null;
  dateEnd = null;
  modalRef?: BsModalRef;
  constructor(private courseService: CourseControllerService, private modalService: BsModalService, private courseInstanceService : CourseInstanceControllerService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  selectCourseIndex(i){
    this.selectedCourseName = this.courses[i].name;
    this.selectedCourseId = this.courses[i]['id'];
  }

  createInstance(){
  
    // 'i' is 'id' property of selected 'CourseResponse' object
    var course = this.courses.find(course => course['id'] === this.selectedCourseId)
    console.log(course)
    this.courseInstanceService.createCourseInstanceUsingPOST({courseId : course['id'], startDate : this.dateStart, endDate : this.dateEnd }).subscribe((courseInstanceCreationResponse) => {
     // this.courses = coursesResponse.body;
     if (!courseInstanceCreationResponse.successful){
        alert(courseInstanceCreationResponse.reason)
     } else {
        alert("You have successufly create course instance for course: " + this.selectedCourseName)
        window.location.reload();
     }
      
    });
  }
    
  

  onDateChange($event){
    console.log($event)
    this.dateStart = $event[0].getTime();
    this.dateEnd = $event[1].getTime();

  }

  ngOnInit(): void {
    this.loadCourses();
  }

  getNextPage(page) {
    this.courseService.getCoursesUsingGET(page.page - 1, this.searchWord, 5, "response").subscribe((coursesResponse) => {
      this.courses = coursesResponse.body;
    });
  }

  searchCourses(searchModel) {
    if (this.searchForm.valid) {
      this.searchWord = this.searchModel.search;
      this.courseService.getCoursesUsingGET(0, this.searchWord, 5, "response").subscribe((coursesResponse) => {
        this.courses = coursesResponse.body;
        this.pagination.setPaginationFromHeaders(coursesResponse.headers);
      });
    }
  }

  
  // also for resetting search
  loadCourses() {
    this.pagination.currentPage = 1;
    this.searchModel = {};
    this.searchWord = "";
    this.courseService.getCoursesUsingGET(0, null, 5, "response").subscribe((coursesResponse) => {
      this.courses = coursesResponse.body;
      this.pagination.setPaginationFromHeaders(coursesResponse.headers);
    });
  }

  createNewCourse(model) {
    if (this.form.valid) {
      this.courseService.createCourseUsingPOST(this.model, "response").subscribe((response) => {
        if (response.status != 201) alert("something wnet wrong try again later");
        else {
          this.options.resetModel();
          alert("course added");
        }
      });
    }
  }

  //popup modal start

  //popup modal end


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
