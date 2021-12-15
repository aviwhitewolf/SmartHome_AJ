import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/Constants';
import { UserService } from '../user.service';


interface Country {
  name : string
  flags : {svg : string}
  currencie : string,
  symbol : string,
  timezones : [string],
  callingCode : string  
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public country: string = ""
  private mobilePattern = "^[0-9]*$"
  private searchingCountryName = ""
  public countryList!: [Country]; 
  public showCountryListDropDown : boolean = false
  public userSelectedCountry! : any
  public showSignupLoader : boolean = false
  public showResponseMessage : any = {'show' : false, 'message' : "Signing up, please wait..."}

  //Home Form Group
  public signUpFormGroup: FormGroup = this.formBuilder.group({
    username : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    country: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    mobile: ['', [Validators.required, Validators.pattern(this.mobilePattern), Validators.minLength(10), Validators.maxLength(10) ]]
  },
  {validator: this.confirmPasswordMatch('password', 'confirmPassword')});

  constructor(private formBuilder: FormBuilder, private userService : UserService) { }

  ngOnInit(): void {
  }

  onSignUp(): void {

    this.showSignupLoader = true
    this.showResponseMessage = {show : true}

    let sigupData = {
      ...this.signUpFormGroup.value, 
      country : this.userSelectedCountry.name, 
      callingCodes : this.userSelectedCountry.callingCodes[0],
      currency : this.userSelectedCountry.currencies[0].code
    }

    this.userService.signUpUser(sigupData)
    .then((response : any) => response.json())
    .then((data : any) => 
    {
      if(data.statusCode){
        this.showResult(Constants.getError(data), false)      
      }else{
        this.showResult('Kindly check mail for confirmation...', true)      
      }
      
    }).catch((err : any)=> {
      console.log(err)
      this.showResult("Some Error Occued, try agin after some time", false)
    });

  }


  private showResult(message : string, error : boolean, data? : any){

    this.showSignupLoader = false
    this.showResponseMessage = {show : true, message : message}  
    if(!error)
    setTimeout(() => {
      this.showResponseMessage = {show : error}  
    }, 3000);

  }

  confirmPasswordMatch(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {

      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }

  }


  public selectCountry(country : Country){

    this.userSelectedCountry = country
    this.signUpFormGroup.get('country')?.patchValue(country.name)
    this.showCountryListDropDown = false

  }

  public searchCountry(data: string) {
    this.signUpFormGroup.get('country')?.reset()
    this.signUpFormGroup.get('country')?.markAsDirty()  
    this.signUpFormGroup.get('country')?.markAsTouched()  
    if (data && data.length >= 2) {
      this.searchingCountryName = data
      this.debouncedUpdate()
    }else{
      this.showCountryListDropDown = false
        
    }


    
  }

  debounce = (fn: Function, ms = 500) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

updateState = () => {
  this.showCountryListDropDown = true
  this.userService.searchCountry(this.searchingCountryName)
  .then((response : any) => response.json())
  .then((data : any) => {
    this.countryList = data
    
  }).catch((err : Error) => {
    this.showCountryListDropDown = false
    console.log("Invalid data", err)

  });
};

debouncedUpdate = this.debounce(this.updateState);

}

