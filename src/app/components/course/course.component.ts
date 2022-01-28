import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {


  

  constructor() { }

  ngOnInit(): void {
  }

  registerDataForm = new FormGroup({
    courseName: new FormControl('', Validators.required),
    etcs: new FormControl('',Validators.required),
  });

  addNewCourse()  {
    //Replace with service call
    alert("Dodavenje course-a! \nCourse name: " + this.registerDataForm.value.courseName + "\nETCS: " + this.registerDataForm.value.etcs);
  }

}
