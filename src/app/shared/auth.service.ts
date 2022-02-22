import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginDataRequest } from '../classes/login-data-request'
import { UserRegisterData } from '../classes/UserRegisterData';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:8080/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  Register(user: UserRegisterData) {
    let api = `${this.endpoint}auth/register`;
    return this.http.post(this.endpoint+"register", user,{responseType:'text'})
      .pipe(
        catchError(this.handleError)
      )
  }

  // login
  async login(data) {
    var loginData= new LoginDataRequest(data.value);
     return this.http.post<any>(this.endpoint+"auth/login", loginData)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        localStorage.setItem('role', res.role)
        this.router.navigate(["/account"])
      })
  }

  getRole(){
    return localStorage.getItem('role');
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeRole = localStorage.removeItem('role');
    if (removeToken == null) {
      this.router.navigate(["/login"]);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}