import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
// import { FormGroup } from '@angular/forms';
// import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { ExamPeriod, ExamPeriodControllerService, TestControllerService } from "src/app/api";
@Component({
  selector: "app-register-for-test",
  templateUrl: "./register-for-test.component.html",
  styleUrls: ["./register-for-test.component.scss"],
})
export class RegisterForTestComponent implements OnInit {
  constructor(private examPeriodService: ExamPeriodControllerService, private testService: TestControllerService, public router: Router) {}

  examPeriods: ExamPeriod[] = [];
  optionsExamPeriod = [];
  optionsTest = [];
  idsOfStudentTests = [];

  ngOnInit(): void {
    this.examPeriodService.getActiveExamPeriodsUsingGET("body").subscribe((res) => (this.optionsExamPeriod = res));
  }

  singleSelect: any = null;
  singleSelect2: any = null;
  config = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
  };

  config2 = {
    displayKey: "description", // if objects array passed which key to be displayed defaults to description
  };
  selectionChanged($event) {
    // console.log($event.value.id);
    if ($event.value.id != null) {
      console.log("aasd");
      this.examPeriodService.getTestsForExamPeriodAndStudentUsingGET($event.value.id, "body").subscribe((res) => (this.optionsTest = res));
      // this.examPeriodService.getListOfMyTestsUsingGET($event.value.id, "body").subscribe((res) => {
      //   this.idsOfStudentTests = res;
      //   this.addTestsIntoDropDown();
      // });
    } else {
      this.optionsTest = null;
      this.singleSelect2 = null;
    }
  }

  // Adds tests that user didnt already register for
  addTestsIntoDropDown() {
    this.optionsTest = this.optionsTest.filter((test) => {
      return !this.idsOfStudentTests.includes(test.id);
    });
  }

  registerForTest() {
    if (this.singleSelect2.id != null) {
      // alert(this.singleSelect2.id);
      // console.log(this.singleSelect2);
      this.testService
        .registerForTestUsingPOST(this.singleSelect2.id, "response")
        .toPromise()
        .then((res) => {
          alert("Registered successfully");
          this.router.navigate(["/tests"]);
        })
        .catch((err) => alert(err.error));
    } else {
      alert("You need to select a test you want to register for");
    }
  }
}
