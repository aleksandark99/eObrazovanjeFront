import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service'

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.doLogout();
  }

}
