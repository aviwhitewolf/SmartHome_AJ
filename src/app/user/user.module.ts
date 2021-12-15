import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { WelcomeComponent } from './welcome/welcome.component';




@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ResetPasswordComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  providers : [UserService]
})
export class UserModule { }
