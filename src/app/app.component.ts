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
  
}
