import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css']
})
export class PopupMessageComponent implements OnInit {

  @Input()
  public type : string = "success"

  @Input()
  public errorMsg : string = ""

  constructor() { }

  ngOnInit(): void {
  }

}