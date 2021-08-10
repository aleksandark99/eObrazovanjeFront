  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormControl,Validators,ReactiveFormsModule  } from '@angular/forms';
  import { AuthService} from '../../shared/auth.service'
  import { Router } from '@angular/router';
import { UserRegisterData } from 'src/app/classes/UserRegisterData';
  
  @Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
  export class RegisterComponent implements OnInit {
  
    constructor(private authService:AuthService,public router: Router) { }
  
    ngOnInit(): void {
    }
  
  
    registerDataForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('',Validators.required),
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      accountNo: new FormControl('',Validators.required),
      personalNumber: new FormControl('',Validators.required),
      userType: new FormControl('',Validators.required),
    });
  
     register()  {
      if(this.registerDataForm.invalid) 
      alert ("Please fill all fields properly")
      else{
       var userToRegister:UserRegisterData = new UserRegisterData(this.registerDataForm.value);
       console.log(this.registerDataForm.value)
       console.log(userToRegister)
       this.authService.Register(this.registerDataForm.value).subscribe((res:string)=>{
        alert("Registration has been successsful, please login now.")
        this.router.navigate(['/login'])
          console.log(res)
        },(error) => {
          console.log(error) 
        }
          )
        
      }

    }
    
  }
  