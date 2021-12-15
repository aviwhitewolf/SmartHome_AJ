import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms/rooms.component';
import { SingleRoomComponent } from './single-room/single-room.component';
import { SingleHomeComponent } from './single-home/single-home.component';
import { DevicesComponent } from './devices/devices.component';
import { SingleDeviceComponent } from './single-device/single-device.component';
import { HomesComponent } from './homes/homes.component';
import { RouterModule } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import { AddHomeComponent } from './add-home/add-home.component';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoomComponent } from './add-room/add-room.component';
import { IconsComponent } from './icons/icons.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { AddSensorComponent } from './add-sensor/add-sensor.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { OthersModule } from '../others/others.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { OptionMenuComponent } from './option-menu/option-menu.component';



@NgModule({
  declarations: [
       RoomsComponent,
       SingleRoomComponent,
       SingleHomeComponent,
       DevicesComponent,
       SingleDeviceComponent,
       HomesComponent,
       AddHomeComponent,
       AddRoomComponent,
       IconsComponent,
       AddDeviceComponent,
       AddSensorComponent,
       OptionMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSliderModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    OthersModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MainModule { }
