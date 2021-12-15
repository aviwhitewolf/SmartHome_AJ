import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/Constants';
import { MainService } from '../main.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  @Input()
  public type : String = 'device'
  
  @Input()
  public selectType : String = 'home'

  public  showDialog : boolean = false
  public iconName: string = 'public';
  public homeIdFromParam : any = ''
  public showLoader: boolean = false;
  public showPopUp: boolean = false;
  public popUpType: string = '';
  public errorMsg : string = ''
  public rooms? : any 
  public hooms? : any 
  public showIcons : boolean = false
  private formdata = new FormData();

  // Sensor Form Group
  public addDeviceFormGroup: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)],],
    icon: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)],],
    color: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)],],
    voltage :['', [Validators.required]],
    home: ['', [Validators.required]],
    extra : ['']
  });

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private mainService : MainService) {

    this.homeIdFromParam = this.route.snapshot.paramMap.get('homeId');
    this.addDeviceFormGroup.get('color')?.patchValue('#00000')

  }

  ngOnInit(): void {

    if(this.homeIdFromParam){
      this.getRooms()
    }else{
      this.gethomes()
    }

  }

  public selecteIcon(iconName : string){

    this.iconName = iconName
    this.addDeviceFormGroup.get('icon')?.patchValue(iconName)
    this.toggleDialog()

  }

  public postDevice(): void {
    
    this.formdata.delete('data')
    this.showLoader = true
    console.log(this.addDeviceFormGroup.value)
    
    let data = {
    "name" : this.addDeviceFormGroup.value.name,
    "icon" : this.addDeviceFormGroup.value.icon,
    "state" : false,
    "voltage" : this.addDeviceFormGroup.value.voltage,
    "extra" : this.addDeviceFormGroup.value.extra
    }

    this.formdata.append("data", JSON.stringify(data));
    this.mainService.addDevice(this.formdata, this.addDeviceFormGroup.value.home, this.homeIdFromParam )
      .then((response: any) => response.json())
      .then((data: any) => {
        this.showLoader = false
        if (data.statusCode) {
          console.log("Error 1", data)
          this.showPopUp = true
          this.popUpType = 'error'
          this.errorMsg = Constants.getError(data)
        } else {
          console.log("Success", data)
          this.showPopUp = true
          this.popUpType = 'success'
        }

        this.reset()

      }).catch((err: any) => {
        console.log(err)
        this.showLoader = false
        this.popUpType = 'error'
        this.reset();
      });
  }


  public getRooms(){

    this.mainService.getRooms(this.homeIdFromParam)
    .then((response: any) => response.json())
    .then((data: any) => {

      this.showLoader = false

      if (data.statusCode) {
        console.log("Error 1", data)
        this.popUpType = 'error' 
        this.showPopUp = true
        this.errorMsg = Constants.getError(data)
      } else {
        this.rooms = data.rooms
      }

    }).catch((err: any) => {
      console.log(err)
      this.showLoader = false
      this.popUpType = 'error'
      this.reset();
    });

  }

  reset() {

    setTimeout(() => {
      this.showPopUp = false
      this.popUpType = ''
      this.showLoader = false

    }, 2700);
  }
  
  public gethomes(){

    this.mainService.getHome()
    .then((response: any) => response.json())
    .then((data: any) => {

      this.showLoader = false

      if (data.statusCode) {
        console.log("Error 1", data)
        this.popUpType = 'error' 
        this.errorMsg = Constants.getError(data)
      } else {
        this.hooms = data
      }

    }).catch((err: any) => {
      console.log(err)
      this.showLoader = false
      this.popUpType = 'error'
    });

  }



  toggleDialog(){
    this.showDialog = !this.showDialog
  }

}
