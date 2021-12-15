import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-device',
  templateUrl: './single-device.component.html',
  styleUrls: ['./single-device.component.css']
})
export class SingleDeviceComponent implements OnInit {

  public  showDialog : boolean = false
  
  constructor() { }

  @Input()
  public state? : boolean
  @Input()
  public voltage? : Number
  @Input()
  public extra?: any
  @Input()
  public icon?: string
  @Input()
  public name? : string
  @Input()
  public color? : string

  ngOnInit(): void {
  }

  toggleDialog(){
    this.showDialog = !this.showDialog
    console.log("Value",this.showDialog)
  }

}
