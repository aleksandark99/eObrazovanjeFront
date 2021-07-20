import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard'
import { NotSignedIn } from './guards/not-signed-in.guard'
const routes: Routes = [
  {path: 'login', component: LoginComponent,canActivate:[NotSignedIn]},
  {path: 'register', component: RegisterComponent,canActivate:[NotSignedIn]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
