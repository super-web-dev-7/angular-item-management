import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { AuthResetPasswordComponent } from './auth-reset-password/auth-reset-password.component';

const routes: Routes = [
  { path: "signin", component: AuthSigninComponent },
  { path: "signup", component: AuthSignupComponent },
  { path: "reset-password", component: AuthResetPasswordComponent },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
