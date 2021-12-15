import { Injectable } from '@angular/core';
import { Constants } from 'src/Constants';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public searchCountry(name: string): any {

    return fetch(`https://restcountries.com/v2/name/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

  }

  public signUpUser(data: any): any {


    return fetch(Constants.BASEURL + '/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })


  }

  public loginUser(data: any): any {

    return fetch(Constants.BASEURL + '/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

  }

  public setToLocalStorage(data : any, key : string){
    localStorage.setItem(key, JSON.stringify(data));
  }

  
  public getFromLocalStorage( key : string) : any{
    return  JSON.parse(localStorage.getItem(key) || "" );
  }

}
