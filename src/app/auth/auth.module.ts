import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { AuthResetPasswordComponent } from './auth-reset-password/auth-reset-password.component';

@NgModule({
  declarations: [
    AuthSigninComponent, 
    AuthSignupComponent, 
    AuthResetPasswordComponent], 
  imports: [
    CommonModule, 
    FormsModule, 
    AuthRoutingModule]
})
export class AuthModule {}
