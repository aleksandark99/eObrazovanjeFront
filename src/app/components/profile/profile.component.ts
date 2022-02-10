import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Location } from "@angular/common";
import { Pagination } from 'src/app/model/pagination';
import { ProfileControllerService } from 'src/app/api/api/profileController.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  userType = '';   //'student' or 'lecturer'
  userId : number; //'id' taken from 'User' table
  model: any = {};
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  formlyObjectIsIndexOrCode = {};
  fields: FormlyFieldConfig[] = null;

 
  constructor(private profileService : ProfileControllerService ,private activatedRoute : ActivatedRoute,  private location: Location, private router: Router) { 
    this.userType = this.router.url.split('?')[0].split('/').pop();
    
  }

 


  ngOnInit(): void {

    this.activatedRoute.queryParams
    .subscribe(params => {
      var isInt = /^\+?\d+$/.test(params.id) //regex check to if isInt
      if (!isInt){
        this.location.replaceState("/" + this.userType + "s");
      } else {
        this.userId = Number.parseInt(params.id);
       
        this.profileService
          .getProfileInfoUsingGET(this.userId, this.userType, 'response', false)
          .subscribe((profileResponse) => {
            if (profileResponse.body.unknownUser){
              alert("Error: Unknown user!!!");
            } else {
              this.initFormlyObjectIsIndexOrCode()
              this.initFormlyFieldConfig();
              
              this.model.firstName = profileResponse.body.firstName;
              this.model.lastName = profileResponse.body.lastName;
              this.model.indexOrCode = profileResponse.body.indexOrCode;
              this.model.email = profileResponse.body.email;
            }
          
              //TODO: use for Enrollments and Course Instance
              //this.pagination.setPaginationFromHeaders(studentsResponse.headers);
            });
      }

    });

    
  }

  public test2(){
    console.log("a")
  }

  private initFormlyObjectIsIndexOrCode(){
    if (this.userType === 'student' || this.userType === 'lecturer'){
      this.formlyObjectIsIndexOrCode = {
        key: 'indexOrCode',
        type: 'input',
        modelOptions: {
          debounce: {
            default: 2000,
          },
        },
        templateOptions: {
          label: this.userType === 'student' ? 'Index' : 'Lecturers Code',
          // placeholder: 'This one is disabled if there is no text in the other input',
        },
        expressionProperties: {
          'templateOptions.disabled': 'model.email || !model.email',
        },
      };
    }
  }

  private initFormlyFieldConfig(){
    this.options = {
      formState: {
        disabled: false,
      },
    };
     this.fields = [
      {
        key: 'firstName',
        type: 'input',
        modelOptions: {
          // debounce: {
          //   default: 2000,
          // },
        },
        templateOptions: {
          label: 'First name',
          // placeholder: 'This one is disabled if there is no text in the other input',
        },
        expressionProperties: {
          'templateOptions.disabled': 'model.email || !model.email',
        },
      },
      {
        key: 'lastName',
        type: 'input',
        modelOptions: {
          // debounce: {
          //   default: 2000,
          // },
        },
        templateOptions: {
          label: 'Last name',
          // placeholder: 'This one is disabled if there is no text in the other input',
        },
        expressionProperties: {
          'templateOptions.disabled': 'model.email || !model.email',
        },
      },
      this.formlyObjectIsIndexOrCode,
      {
        key: 'email',
        type: 'input',
        modelOptions: {
          debounce: {
            default: 2000,
          },
        },
        templateOptions: {
          label: 'Email',
          required: true
        },
        expressionProperties: {
          'templateOptions.disabled': 'false',
        },
      }
    ];
  }


  public submit(searchModel) {
    if (this.form.valid) {
      var newEmail = this.fields[3].formControl.value;

      this.profileService
          .updateEmailUsingPOST(newEmail, this.userId, 'response', false)
          .subscribe((updateEmailResponse) => {
          
            alert(JSON.stringify(updateEmailResponse.body.successfully));
              
          });
    }
  }

}
