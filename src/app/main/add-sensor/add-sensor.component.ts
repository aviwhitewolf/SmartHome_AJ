import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';


@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent implements OnInit {

  @Input()
  public type : String = 'sensor'
  
  @Input()
  public selectType : String = 'home'
  public iconName: string = 'public';


  // Sensor Form Group
  public addSensorFormGroup: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)],],
    icon: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)],],
    home: ['', [Validators.required],],
    sensor: this.formBuilder.array([this.addSensorKeyValueToFormArray()]),
  });

  constructor(private formBuilder: FormBuilder,private mainService : MainService) { }

  ngOnInit(): void {
  }
  
  public postSensor(): void {

    console.log(this.addSensorFormGroup.value)

  }

   getFormControl(groupName: string): FormArray {
    return <FormArray>this.addSensorFormGroup.get(groupName);
  }

  // Add more key value pair to sensor FormGroup
  private addSensorKeyValueToFormArray(): FormGroup {
    return this.formBuilder.group({
      key: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      value: [''],
    });
  }

  // Add more key value pair to sensor
  public addSensorKeyValue(): void {
    (<FormArray>this.addSensorFormGroup.get('sensor')).push(
      this.addSensorKeyValueToFormArray()
    );
  }

  deleteSellingPoint(index: number) {
    let sensorArray = (this.addSensorFormGroup.get('sensor') as FormArray);
    console.log((this.addSensorFormGroup.get('sensor') as FormArray).controls[index]?.touched)

    sensorArray.removeAt(index)
  }

  checkForSensorErrors(index: number): boolean {
    let sensorArray = this.getFormArray('sensor');
    if (sensorArray.controls[index].get('key')?.errors && (sensorArray.controls[index].get('key')?.touched || sensorArray.controls[index].get('key')?.dirty))
      return true
    else
      return false

  }

  public getFormArray(formGroupName : string) : FormArray{
    return (this.addSensorFormGroup.get(formGroupName) as FormArray)
  }

  public getSensorError(index : number, errorName : string) : boolean{
    let sensorArray = this.getFormArray('sensor');
    return sensorArray.controls[index].get('key')?.errors?.[errorName] || false
  }
  // Sensor End



}
