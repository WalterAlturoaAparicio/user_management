import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AUTH_ROUTES } from './auth.routes';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, RouterModule.forChild(AUTH_ROUTES)
  ]
})
export class AuthModule { }
