import { Component, OnInit } from '@angular/core';
import { LectureInstanceResponse, LectureInstancesControllerService } from 'src/app/api';

@Component({
  selector: 'app-my-lectures',
  templateUrl: './my-lectures.component.html',
  styleUrls: ['./my-lectures.component.scss']
})
export class MyLecturesComponent implements OnInit {

  lectures: LectureInstanceResponse[] = [];
  constructor(private lectureInstanceService: LectureInstancesControllerService) { }

  ngOnInit(): void {
    this.loadStudentsEnrollments();
  }

  loadStudentsEnrollments() {
    this.lectureInstanceService.getMyLecturesUsingGET('body').subscribe(response => this.lectures=response)
  }
}
