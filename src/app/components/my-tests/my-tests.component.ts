import { Component, OnInit } from "@angular/core";
import { TestControllerService, TestInstance } from "src/app/api";

@Component({
  selector: "app-my-tests",
  templateUrl: "./my-tests.component.html",
  styleUrls: ["./my-tests.component.scss"],
})
export class MyTestsComponent implements OnInit {
  tests: TestInstance[] = [];

  constructor(private testService: TestControllerService) {}

  ngOnInit(): void {
    this.loadMyTests();
  }

  loadMyTests() {
    this.testService.getMyTestsUsingGET("body").subscribe((response) => (this.tests = response));
  }
}
