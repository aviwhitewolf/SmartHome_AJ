import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/Constants';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showloginLoader: boolean = false
  public loginresponse: any = { 'show': false, 'message': "Logging you in... " }

  //Home Form Group
  public loginFormGroup: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: Router) { }

  ngOnInit(): void { }

  onLogin(): void {
    this.showloginLoader = true
    this.userService.loginUser({
      "identifier": this.loginFormGroup.value.email,
      "password": this.loginFormGroup.value.password
    })
      .then((response: any) => response.json())
      .then((data: any) => {
        if (data.statusCode) {
          this.showResult(Constants.getError(data), false)
        } else {
          this.showResult('Login Successful, redirecting...', true)
          this.userService.setToLocalStorage(data, 'user')
          setTimeout(() => {
            if (data.user.first)
              this.route.navigate(['/welcome']);
            else
              this.route.navigate(['/properties']);
          }, 1000);

        }

      }).catch((err: any) => {
        console.log(err)
        this.showResult('Some error occured, try again after some time', false)
      });
  }

  private showResult(message: string, error: boolean, data?: any) {

    this.showloginLoader = false
    this.loginresponse = { show: true, message: message }
    if (!error)
      setTimeout(() => {
        this.loginresponse = { show: error }
      }, 3000);

  }

}
