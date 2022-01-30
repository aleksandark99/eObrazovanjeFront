import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { StudentControllerService, StudentDto } from 'src/app/api';
import { Pagination } from 'src/app/model/pagination';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: StudentDto[] =[];
  pagination: Pagination = new Pagination();
  searchWord = '';
  courseInstanceId : number = -1;
  canSearchStudents : boolean = true;


  constructor(private studentService: StudentControllerService, private router : ActivatedRoute) { }

  ngOnInit(): void {
    
    this.router.queryParams
      .subscribe(params => {
        this.courseInstanceId = params.courseInstanceId != null ? params.courseInstanceId : -1;
        if (this.courseInstanceId != null && this.courseInstanceId  > -1 ) this.canSearchStudents = false;
        this.loadStudents();
      }
    );
  
  }

   //  METHODS METHODS METHODS METHODS METHODS METHODS METHODS
   pageChanged(event: PageChangedEvent): void {
    this.pagination.page = event.page;
  }

  getNextPage() {

    if (this.courseInstanceId != null && this.courseInstanceId > -1){
      //If 'courseInstanceId' is known we don't consider search field
      var searchObject = {pageNo : this.pagination.currentPage, pageSize : 5, searchWord : ""}
      this.studentService.searchStudentsUsingPOST(this.courseInstanceId, searchObject, "response").subscribe((studentsResponse) => {
        this.students = studentsResponse.body;
        this.pagination.setPaginationFromHeaders(studentsResponse.headers);
      });
    } else {
      //If 'courseInstanceId' is unknown we do consider search field
      var searchObject = {pageNo : this.pagination.currentPage, pageSize : 5, searchWord : this.searchWord}
      this.studentService.searchStudentsUsingPOST(-1, searchObject, "response").subscribe((studentsResponse) => {
        this.students = studentsResponse.body;
        this.pagination.setPaginationFromHeaders(studentsResponse.headers);
      });

    }
  }



  public loadStudents(){
    var searchObject = null;
    var courseInstanceId = null;

    if (this.courseInstanceId != null && this.courseInstanceId > -1){
      searchObject = {pageNo : this.pagination.currentPage, pageSize : 5, searchWord : ""};
      
      courseInstanceId = this.courseInstanceId;
    } else {
     
      searchObject = {pageNo : this.pagination.currentPage, pageSize : 5, searchWord : this.searchWord}
      console.log("test: " + JSON.stringify(searchObject))
      courseInstanceId = -1;
    }


    this.studentService
      .searchStudentsUsingPOST(courseInstanceId, searchObject, 'response', false)
      .subscribe((studentsResponse) => {
        this.students = studentsResponse.body;
        this.pagination.setPaginationFromHeaders(studentsResponse.headers);
      });
    }



    
    
  submit() {
    if (this.form.valid) {
      //alert(JSON.stringify(this.model));
      this.searchWord = this.model.search;
    }
  }

    
    
    
  searchStudents(searchModel) {

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

