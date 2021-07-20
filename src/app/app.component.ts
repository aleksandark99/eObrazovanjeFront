import { Component } from '@angular/core';
import { AuthService} from './shared/auth.service'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  constructor(private authService:AuthService,  private http: HttpClient,) {}
  
  testWithJwt(){
    let body =  { 
      query: `
      query{
    		getExamPeriodsAndExams{
				id,
				name,
		        toDate,
		        fromDate
    		}
		  }
      `
  }
    return this.http.post<any>("http://localhost:8080/student-service/auth/graphql",body )
    .subscribe((res: any) => {
      console.warn(res)
    
    })
  }
}
