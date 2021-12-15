import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/Constants';
import { MainService } from '../main.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css']
})
export class HomesComponent implements OnInit {

  public showLoader: boolean = true
  public homes: any
  public popUpType : string = ''
  public errorMsg : string = ''
  public showOptionsMenu : boolean = false
  public clickedHome : any = {name : "", id : ""}
  constructor(private mainService: MainService, private route: Router) { }

  ngOnInit(): void {
    this.getHomes()
  }

  getHomes() {
    this.mainService.getHome()
      .then((response: any) => response.json())
      .then((data: any) => {

        this.showLoader = false

        if (data.statusCode) {
          console.log("Error 1", data)
          this.popUpType = 'error' 
          this.errorMsg = Constants.getError(data)
        } else {
          console.log("Success", data)
          this.homes = data
        }

      }).catch((err: any) => {
        console.log(err)
        this.showLoader = false
        this.popUpType = 'error'
      });

  }

  getUrl(url: any): string {
   return this.mainService.getUrl(url)
  }

  navigateToRoom(id : string){

    this.route.navigate(['/property', id]);   

  }

  showOptions(event : Event, home : any){
    this.clickedHome = home
    this.showOptionsMenu = true
    console.log("Clicked")
    event.stopPropagation();
  }

  closeOptions(flag : boolean){
    this.showOptionsMenu = flag
  }

}
