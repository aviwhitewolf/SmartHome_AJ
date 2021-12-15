import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './main/add-device/add-device.component';
import { AddHomeComponent } from './main/add-home/add-home.component';
import { AddRoomComponent } from './main/add-room/add-room.component';
import { HomesComponent } from './main/homes/homes.component';
import { IconsComponent } from './main/icons/icons.component';
import { RoomsComponent } from './main/rooms/rooms.component';
import { SingleHomeComponent } from './main/single-home/single-home.component';
import { SingleRoomComponent } from './main/single-room/single-room.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { SignupComponent } from './user/signup/signup.component';
import { WelcomeComponent } from './user/welcome/welcome.component';


const routes: Routes = [
  {path:'icons', component:IconsComponent,pathMatch:'full'},
  {path:'properties', component:HomesComponent,pathMatch:'full'},
  {path:'addProperty/:homeId', component:AddHomeComponent,pathMatch:'full'},
  {path:'rooms', component:RoomsComponent,pathMatch:'full'},
  {path:'addRoom', component:AddRoomComponent,pathMatch:'full'},
  {path:'addRoom/:homeId', component:AddRoomComponent,pathMatch:'full'},
  {path:'room/:roomId/:homeId', component:SingleRoomComponent,pathMatch:'full'},
  {path:'property/:homeId', component:SingleHomeComponent,pathMatch:'full'},
  {path:'login', component:LoginComponent,pathMatch:'full'},
  {path:'signup', component:SignupComponent,pathMatch:'full'},
  {path:'welcome', component:WelcomeComponent,pathMatch:'full'},
  {path:'resetPassword/:resetTokken', component:ResetPasswordComponent,pathMatch:'full'},
  {path:'profile', component:ProfileComponent,pathMatch:'full'},
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'**',redirectTo:''} //nopath found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
