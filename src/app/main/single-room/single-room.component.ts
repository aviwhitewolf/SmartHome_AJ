import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/Constants';
import { MainService } from '../main.service';

@Component({
  selector: 'app-single-room',
  templateUrl: './single-room.component.html',
  styleUrls: ['./single-room.component.css']
})
export class SingleRoomComponent implements OnInit {

  public roomIdFromParam : any = '' 
  public homeIdFromParam : any = '' 
  public devices : any
  public popUpType : string = ''
  public errorMsg : string = ''
  public showLoader: boolean = true
  public room? : any 

  constructor(private route: ActivatedRoute, private mainService : MainService) {
    this.homeIdFromParam = this.route.snapshot.paramMap.get('homeId');
    this.roomIdFromParam = this.route.snapshot.paramMap.get('roomId');
  }

  ngOnInit(): void {
    this.getDevices()
  }

  public getDevices() : any{
    this.mainService.getDevices(this.homeIdFromParam, this.roomIdFromParam)
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
        this.devices = data.devices
        this.room = data.room
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
