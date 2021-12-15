import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-option-menu',
  templateUrl: './option-menu.component.html',
  styleUrls: ['./option-menu.component.css']
})
export class OptionMenuComponent implements OnInit {


  @Output()
  public closeOptionMenu = new EventEmitter<boolean>();

  @Input()
  public type : string = ""

  @Input()
  public id : string = ""

  @Input()
  public name : string = ""
 

  constructor() { }

  ngOnInit(): void {
  }

  
  toggleDialog(){
    this.closeOptionMenu.emit(false)

  }

  onDelete(){
    if(this.type == "home"){
    }
  }

  checkName(name : string){

  }

}
