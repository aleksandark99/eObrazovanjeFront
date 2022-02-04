import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../shared/auth.service'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl,Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,  private http: HttpClient,public router: Router) { }

  ngOnInit(): void {
  }

  loginDataForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('',Validators.required),
  });
   login()  {
     this.authService.login(this.loginDataForm)
     .then(res => {
      this.router.navigate(["/courses"])
      console.log(this.authService.isLoggedIn)
    })
    .catch(err =>console.log("ERROR LOGGING IN: "+ err))

  }
}
