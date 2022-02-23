import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TestControllerService, TestInstanceWithUser } from "src/app/api";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
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

  gradeTest(model){
    if(this.form.valid){
      this.testInstanceService.gradeTestUsingPOST(model.points,model.testInstanceId,'response').toPromise()
      .then(res=> alert("Test graded"))
      .catch(err => console.warn(err))
    }else{
      alert("Incomplete form")
    }
  }

  form = new FormGroup({});

  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      className: "section-label",
      template: "<hr /><div><strong>Create new course:</strong></div>",
    },
    {
      fieldGroupClassName: "row",
      fieldGroup: [
        {
          className: "col-3",
          type: "input",
          key: "testInstanceId",
          templateOptions: {
            type: "number",
            label: "Id",
            max: 30,
            min: 0,
            required: true,
          },
        },
        {
          className: "col-3",
          type: "input",
          key: "points",
          templateOptions: {
            type: "number",
            label: "Points",
            max: 30,
            min: 0,
            required: true,
          },
        },
      ],
    },
  ];
}
