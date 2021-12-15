import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private userService: UserService, private route: Router) {

     let data = this.userService.getFromLocalStorage('user')
     if (!data.user.first)
         this.route.navigate(['/homes']);    

   }

  ngOnInit(): void {
  }




}
