import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../main.service';
import { Constants } from 'src/Constants';

@Component({
  selector: 'app-single-home',
  templateUrl: './single-home.component.html',
  styleUrls: ['./single-home.component.css']
})
export class SingleHomeComponent implements OnInit {

  public homeIdFromParam : any = '' 
  public rooms : any
  public currentHome : any
  public popUpType : string = ''
  public errorMsg : string = ''
  public showLoader: boolean = true
  public home? : any 

  constructor(private route: ActivatedRoute,private mainService : MainService) { 
    this.homeIdFromParam = this.route.snapshot.paramMap.get('homeId');
    // console.log('homeList',this.globalService.homesList)
    // this.currentHome = this.globalService?.homesList?.find((home : any) => home.id == this.homeIdFromParam)
  }

  ngOnInit(): void {

    this.getRooms()

  }

  getRooms() {
    this.mainService.getRooms(this.homeIdFromParam)
      .then((response: any) => response.json())
      .then((data: any) => {

        this.showLoader = false

        if (data.statusCode) {
          console.log("Error 1", data)
          this.popUpType = 'error' 
          this.errorMsg = Constants.getError(data)
        } else {
          console.log(data)
          console.log("Success", data)
          this.rooms = data.rooms
          this.home = data.home
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


}
