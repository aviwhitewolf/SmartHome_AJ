import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupMessageComponent } from './popup-message/popup-message.component';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    PopupMessageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports : [PopupMessageComponent]
})
export class OthersModule { }
