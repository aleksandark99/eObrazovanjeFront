import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { StudentDto } from 'src/app/api/model/studentDto'

import { Pagination } from 'src/app/model/pagination';
import { Location } from "@angular/common";

import { StudentControllerService } from 'src/app/api/api/studentController.service';
import { isBoolean } from 'ngx-bootstrap/chronos/utils/type-checks';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: StudentDto[] =[];
  pagination: Pagination = new Pagination();
  searchWord = '';
  courseInstanceId : number;
  public student = 2;
  


  constructor(private studentService: StudentControllerService, private router : ActivatedRoute,  private location: Location) { }

  ngOnInit(): void {
    //Number.isInteger(params.courseInstanceId)
    this.router.queryParams
      .subscribe(params => {
        var isInt = /^\+?\d+$/.test(params.courseInstanceId) //regex check to isInt
        if (!isInt){
          this.location.replaceState("/students");
          this.courseInstanceId = -2
        } else {
          this.courseInstanceId =  Number.parseInt(params.courseInstanceId) > -1 ? params.courseInstanceId : -2;
        }
        this.studentService
            .searchStudentsUsingPOST(this.courseInstanceId, {pageNo : 0, pageSize : 5, searchWord : ""}, 'response', false)
            .subscribe((studentsResponse) => {
                this.students = studentsResponse.body;
                this.pagination.setPaginationFromHeaders(studentsResponse.headers);
              });
      });
  }


   //  METHODS METHODS METHODS METHODS METHODS METHODS METHODS
  getNextPage(page) {
    if (this.courseInstanceId > -1){
      //If 'courseInstanceId' is known we don't consider search field
      var searchObject = {pageNo : page.page-1, pageSize : 5, searchWord : ""}
      this.studentService.searchStudentsUsingPOST(this.courseInstanceId, searchObject, "response").subscribe((studentsResponse) => {
        this.students = studentsResponse.body;
      });
    } else {
      //If 'courseInstanceId' is unknown we do consider search field
      var searchObject = {pageNo : page.page-1, pageSize : 5, searchWord : this.searchWord}
      this.studentService.searchStudentsUsingPOST(-1, searchObject, "response").subscribe((studentsResponse) => {
        this.students = studentsResponse.body;
      });

    }
  }

  public resetStudents() {
    this.courseInstanceId = -2;
    this.model = {};
    this.searchWord = "";
    this.model.search = "";
    this.location.replaceState("/students");
    var searchObject = {pageNo : 0, pageSize : 5, searchWord : this.searchWord}
      this.studentService.searchStudentsUsingPOST(this.courseInstanceId, searchObject, "response").subscribe((studentsResponse) => {
        this.students = studentsResponse.body;
        this.pagination.setPaginationFromHeaders(studentsResponse.headers);
      });
  }

    
  public searchStudents(searchModel) {
    if (this.form.valid) {
      this.pagination.resetPagination();
      this.searchWord = this.model.search;
      this.courseInstanceId = -2;
      this.location.replaceState("/students");
      var searchObject = {pageNo : 0, pageSize : 5, searchWord : this.searchWord}
      this.studentService.searchStudentsUsingPOST(this.courseInstanceId, searchObject, "response").subscribe((studentsResponse) => {
        this.students = studentsResponse.body;
        this.pagination.setPaginationFromHeaders(studentsResponse.headers);
      });
    }
  }


  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
  
    {
      key: 'search',
      type: 'input',
      templateOptions: {
        // label: 'Text',
        placeholder: 'First name or last name or index',
        required: true,
      }
    }
  ];

}

