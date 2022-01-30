import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
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
 // searchModel: any = {};



searchCourses(searchModel) {
  if (this.form.valid) {
    alert(JSON.stringify(this.model));
  }
}

loadCourses() {
  if (this.form.valid) {
    alert(JSON.stringify(this.model));
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

  submit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }




  searchStudents(searchModel) {
    // if (this.searchForm.valid) {
    //   this.pagination.resetPagination();
    //   this.searchWord = this.searchModel.search;
    //   this.courseService
    //     .getCourses(0, this.searchWord, 5, 'response')
    //     .subscribe((coursesResponse) => {
    //       this.courses = coursesResponse.body;
    //       this.pagination.setPaginationFromHeaders(coursesResponse.headers);
    //     });
    // }
  }










  constructor(private studentService: StudentControllerService) { }

  ngOnInit(): void {
    // this.students = [{firstName : "pera", lastName : "aaa", index : "sf0321"},
    // {firstName : "sss", lastName : "bbb", index : "aaa"}
    // ]
    this.loadStudents()
    
  }



  public loadStudents(){
    //this.searchModel = {};
    this.searchWord = '';
    this.pagination.resetPagination();
    var x = {pageNo : 0, pageSize : 5, searchWord : ""}
    this.studentService
      .searchStudentsUsingPOST(1, x, 'response', false)
      .subscribe((studentsResponse) => {
        this.students = studentsResponse.body;
        this.pagination.setPaginationFromHeaders(studentsResponse.headers);
      });
    }

}

