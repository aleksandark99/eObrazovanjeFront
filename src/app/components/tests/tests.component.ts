import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseInstanceControllerService, ExamPeriod, ExamPeriodControllerService, Test, TestControllerService, TestInstanceRequest } from "src/app/api";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-tests",
  templateUrl: "./tests.component.html",
  styleUrls: ["./tests.component.scss"],
})
export class TestsComponent implements OnInit {
  constructor(
    private examPeriodService: ExamPeriodControllerService,
    private testService: TestControllerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private testInstanceService: CourseInstanceControllerService
  ) {}
  courseInstanceId = null;
  tests: Test[] = [];
  optionsExamPeriod = [];
  singleSelect: any = null;
  periodSelected: boolean = false;
  config = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
  };
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params.courseInstanceId);
      this.courseInstanceId = params.courseInstanceId;
      console.log("a");
      if (this.courseInstanceId == null) this.router.navigate(["/my-lecture-instances"]);
      else {
        this.testInstanceService
          .getTestsForCourseInstanceUsingGET(this.courseInstanceId, "body")
          .toPromise()
          .then((res) => (this.tests = res));

        this.examPeriodService.getActiveExamPeriodsUsingGET("body").subscribe((res) => (this.optionsExamPeriod = res));
      }
    });
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
        // {
        //   className: "col-6",
        //   type: 'select',
        //   key: "examPeriodId",
        //   templateOptions: {
        //     label: "Exam Period",
        //     required: true,
        //     options:this.examPeriods,
        //   },
        // },
        {
          className: "col-3",
          type: "input",
          key: "title",
          templateOptions: {
            label: "title",
            required: true,
          },
        },
        {
          className: "col-3",
          type: "input",
          key: "description",
          templateOptions: {
            label: "Description",
            required: true,
          },
        },
        {
          className: "col-3",
          type: "input",
          key: "place",
          templateOptions: {
            label: "Place",
            required: true,
          },
        },
        {
          className: "col-3",
          type: "input",
          key: "maxPoints",
          templateOptions: {
            label: "Max Points",
            type: "number",
            max: 30,
            min: 0,
            required: true,
          },
        },
        {
          className: "col-3",
          key: "date",
          type: "input",
          templateOptions: {
            label: "Date ",
            type: "date",
          },
        },
        {
          className: "col-3",
          key: "time",
          type: "input",
          templateOptions: {
            label: "Date ",
            type: "time",
          },
        },
      ],
    },
  ];

  createNewTest(model) {
    if (this.singleSelect.id == null) alert("You must choose Exam period first");
    console.log(this.singleSelect.id);
    console.log(model);
    if (this.form.valid) {
      // var testInstance: TestInstanceRequest=new TestInstanceRequest()
      // console.warn(this.courseInstanceId);
      // testInstance.courseInstanceId = 1;
      // testInstance.date = new Date(model.datee + ":" + model.time).toString();
      // testInstance.examPeriodId = this.singleSelect.id;
      // testInstance.place = model.place;
      // testInstance.maxPoints = model.maxPoints;
      var a = { 
        courseInstanceId: this.courseInstanceId,
        date: new Date(model.datee + ":" + model.time).toString(),
        examPeriodId :this.singleSelect.id,
        maxPoints :model.maxPoints,
        place: model.place,
        title: model.title
    }
      this.testService
        .createTestUsingPOST(a, "response")
        .toPromise()
        .then((res) => console.log(res))
        .catch((err) => console.log("ERRORRRRRRRRRRR" + err));
    }
  }
}
