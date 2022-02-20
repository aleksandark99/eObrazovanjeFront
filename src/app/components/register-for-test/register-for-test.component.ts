import { Component, OnInit } from "@angular/core";
// import { FormGroup } from '@angular/forms';
// import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ExamPeriod, ExamPeriodControllerService } from "src/app/api";
@Component({
  selector: "app-register-for-test",
  templateUrl: "./register-for-test.component.html",
  styleUrls: ["./register-for-test.component.scss"],
})
export class RegisterForTestComponent implements OnInit {
  constructor(private examPeriodService: ExamPeriodControllerService) {}

  examPeriods: ExamPeriod[] = [];
  optionsExamPeriod = [];
  optionsTest = [];
  idsOfStudentTests = [];

  ngOnInit(): void {
    this.examPeriodService.getActiveExamPeriodsUsingGET("body").subscribe((res) => (this.optionsExamPeriod = res));
  }

  singleSelect: any = [];
  singleSelect2: any = [];
  config = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
  };

  config2 = {
    displayKey: "description", // if objects array passed which key to be displayed defaults to description
  };
  selectionChanged($event) {
    // console.log($event.value.id);
    if ($event.value.id != null) {
      this.examPeriodService.getTestsForExamPeriodAndStudentUsingGET($event.value.id, "body").subscribe((res) => (this.optionsTest = res));
      this.examPeriodService.getListOfMyTestsUsingGET($event.value.id, "body").subscribe((res) => (this.idsOfStudentTests = res));
    }else{
      this.optionsTest=[];
    }
  }
}
