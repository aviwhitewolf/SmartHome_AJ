import { Injectable } from '@angular/core';
import { Constants } from 'src/Constants';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public homesList : any
  public roomsList : any

  constructor() { }

  public addHome(data: any): any {
    return fetch(Constants.BASEURL + '/homes', {
      method: 'POST',
      headers: this.setHeaders(),
      body: data,
    })
  }

  public getHome(): any {
    return fetch(Constants.BASEURL + '/homes', {
      method: 'GET',
      headers: this.setHeaders()
    })
  }

  public getDevices(homeId : string, roomId : string): any {
    return fetch(Constants.BASEURL + '/devices/' + roomId+"/"+ homeId, {
      method: 'GET',
      headers: this.setHeaders()
    })
  }

  public addRoom(data: any): any {
    console.log("Headers", {
      method: 'POST',
      headers: this.setHeaders(),
      body: data,
    })
    return fetch(Constants.BASEURL + '/rooms', {
      method: 'POST',
      headers: this.setHeaders(),
      body: data,
    })

  }
  
  public addDevice(data: any, roomId : string, homeId : string): any {
    console.log("Headers", {
      method: 'POST',
      headers: this.setHeaders(),
      body: data,
    })
    return fetch(Constants.BASEURL + '/devices/'+roomId+'/'+homeId, {
      method: 'POST',
      headers: this.setHeaders(),
      body: data,
    })

  }

  public getRooms(homeId:string): any {
    return fetch(Constants.BASEURL + '/rooms/'+homeId, {
      method: 'GET',
      headers: this.setHeaders()
    })
  }


  private setHeaders(): Headers {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.getFromLocalStorage('user').jwt)
    return myHeaders
  }

  public getFromLocalStorage(key: string): any {
    return JSON.parse(localStorage.getItem(key) || "");
  }

  
  getUrl(url: any): string {
    let _url = (url?.formats?.medium) ? url?.formats?.medium?.url : url?.url
    let finalUrl = Constants.BASEURL + _url
    console.log(finalUrl)
    return Constants.BASEURL + _url
  }

}
