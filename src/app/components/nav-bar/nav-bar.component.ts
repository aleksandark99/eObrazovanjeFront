import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/auth.service";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavBarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
  }

  logout() {
    this.authService.doLogout();
  }

  isAdmin() {
    return this.authService.getRole() == "ROLE_ADMIN";
  }

  isStudent() {
    return this.authService.getRole() == "ROLE_STUDENT";
  }

  isProfessor() {
    return this.authService.getRole() == "ROLE_PROFESSOR";
  }

  isLoggedIn() {
    return this.authService.getToken() ? true : false;
  }

  getUserId(){
    return this.authService.getUserId();
  }
}
