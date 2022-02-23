import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Pagination } from "src/app/model/pagination";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { LecturerDto } from "src/app/api/model/lecturerDto";
import { LecturerControllerService } from "src/app/api/api/lecturerController.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-lecturer",
  templateUrl: "./lecturer.component.html",
  styleUrls: ["./lecturer.component.scss"],
})
export class LecturerComponent implements OnInit {
  lecturers: LecturerDto[] = [];
  pagination: Pagination = new Pagination();
  searchWord = "";
  courseInstanceId: number;
  modalRef?: BsModalRef;
  lecturersNotInCourse: LecturerDto[] = [];
  constructor(private lecturerService: LecturerControllerService, private router: Router, private activatedRoute: ActivatedRoute, private location: Location, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      var isInt = /^\+?\d+$/.test(params.courseInstanceId); //regex check to isInt
      if (!isInt) {
        this.location.replaceState("/lecturer");
        this.courseInstanceId = -2;
      } else {
        this.courseInstanceId = Number.parseInt(params.courseInstanceId) > -1 ? params.courseInstanceId : -2;
      }
      this.lecturerService.searchLecturerUsingPOST(this.courseInstanceId, { pageNo: 0, pageSize: 5, searchWord: "" }, "response", false).subscribe((lecturersResponse) => {
        this.lecturers = lecturersResponse.body;
        this.pagination.setPaginationFromHeaders(lecturersResponse.headers);
      });
    });
  }

  //  METHODS METHODS METHODS METHODS METHODS METHODS METHODS
  public getNextPage(page) {
    if (this.courseInstanceId > -1) {
      //If 'courseInstanceId' is known we don't consider search field
      var searchObject = { pageNo: page.page - 1, pageSize: 5, searchWord: "" };
      this.lecturerService.searchLecturerUsingPOST(this.courseInstanceId, searchObject, "response").subscribe((lecturersResponse) => {
        this.lecturers = lecturersResponse.body;
      });
    } else {
      //If 'courseInstanceId' is unknown we do consider search field
      var searchObject = { pageNo: page.page - 1, pageSize: 5, searchWord: this.searchWord };
      this.lecturerService.searchLecturerUsingPOST(-1, searchObject, "response").subscribe((lecturersResponse) => {
        this.lecturers = lecturersResponse.body;
      });
    }
  }

  public resetLecturer() {
    this.courseInstanceId = -2;
    this.model = {};
    this.searchWord = "";
    this.model.search = "";
    this.location.replaceState("/lecturers");
    var searchObject = { pageNo: 0, pageSize: 5, searchWord: this.searchWord };
    this.lecturerService.searchLecturerUsingPOST(this.courseInstanceId, searchObject, "response").subscribe((lecturersResponse) => {
      this.lecturers = lecturersResponse.body;
      this.pagination.setPaginationFromHeaders(lecturersResponse.headers);
    });
  }

  public searchLecturers(searchModel) {
    if (this.form.valid) {
      this.pagination.resetPagination();
      this.searchWord = this.model.search;
      this.courseInstanceId = -2;
      this.location.replaceState("/lecturers");
      var searchObject = { pageNo: 0, pageSize: 5, searchWord: this.searchWord };
      this.lecturerService.searchLecturerUsingPOST(this.courseInstanceId, searchObject, "response").subscribe((lecturersResponse) => {
        this.lecturers = lecturersResponse.body;
        this.pagination.setPaginationFromHeaders(lecturersResponse.headers);
      });
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
      key: "search",
      type: "input",
      templateOptions: {
        // label: 'Text',
        placeholder: "First name or last name or code",
        required: true,
      },
    },
  ];

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.lecturerService.getLecturersNotInCourseInstanceUsingGET(this.courseInstanceId, "body").subscribe((res) => {
      this.lecturerOptions = res;
      this.lecturerOptions.forEach((user) => {
        user.firstName = user.firstName + " " + user.lastName + " " + user.code;
      });
    });
  }

  isCourseInstanceSelected() {
    return this.courseInstanceId > 0;
  }

  lecturerOptions = [];
  singleSelect: any = null;
  config = {
    displayKey: "firstName", // if objects array passed which key to be displayed defaults to description
  };
  async addLecturerToCourse() {
    await this.lecturerService
      .addLecturerToCourseUsingPOST(this.courseInstanceId, this.singleSelect.id, "body").subscribe(res => console.log("sucess"));
      this.router.navigate(["/course-instances"]);
      this.modalRef?.hide();

  }
}
