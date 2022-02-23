import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TestControllerService, TestInstanceWithUser } from "src/app/api";

@Component({
  selector: "app-test-instances",
  templateUrl: "./test-instances.component.html",
  styleUrls: ["./test-instances.component.scss"],
})
export class TestInstancesComponent implements OnInit {
  testId = null;
  courseInstances: TestInstanceWithUser[] = [];
  constructor(private route: ActivatedRoute, private testInstanceService: TestControllerService) {
    this.route.queryParams.subscribe((params) => {
      this.testId = params.testId;
    });
  }

  ngOnInit(): void {
    this.testInstanceService
      .getTestInstancesUsingGET(this.testId, "body")
      .toPromise()
      .then((res) => (this.courseInstances = res))
      .catch((err) => console.warn(err));
  }
}
