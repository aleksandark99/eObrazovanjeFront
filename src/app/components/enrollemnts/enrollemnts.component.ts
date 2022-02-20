import { Component, OnInit } from '@angular/core';
import { EnrollmentControllerService, EnrollmentResponse } from "src/app/api";
import { Pagination } from 'src/app/model/pagination';

@Component({
  selector: 'app-enrollemnts',
  templateUrl: './enrollemnts.component.html',
  styleUrls: ['./enrollemnts.component.scss']
})
export class EnrollemntsComponent implements OnInit {
  enrollments: EnrollmentResponse[] = [];
  pagination: Pagination = new Pagination();
  constructor(private enrollmentService: EnrollmentControllerService) { }

  ngOnInit(): void {
    this.loadStudentsEnrollments();
  }

  

  
  // also for resetting search
  loadStudentsEnrollments() {
    this.enrollmentService.getMyEnrollmentsUsingGET('body').subscribe(response => this.enrollments=response)
  }


}
