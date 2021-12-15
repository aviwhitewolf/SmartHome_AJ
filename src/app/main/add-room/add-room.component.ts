import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  public type: String = 'home';
  public iconName: string = 'public';
  public fileInfo: any = { name: "", size: "" };
  private formdata = new FormData();
  public showLoader: boolean = false;
  public showPopUp: boolean = false;
  public popUpType: string = '';

  //Home Form Group
  public addRoomFormGroup: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)],],
    home: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)],],
    file: [''],
  });

  constructor(private formBuilder: FormBuilder, private mainService: MainService) { }

  ngOnInit() {
  }

  public postRoom(): void {

    this.showLoader = true
    console.log(this.addRoomFormGroup.value)
    let data = { "name": this.addRoomFormGroup.value.name, "location": this.addRoomFormGroup.value.location }
    this.formdata.append("data", JSON.stringify(data));
    this.mainService.addRoom(this.formdata)
      .then((response: any) => response.json())
      .then((data: any) => {
        this.showLoader = false
        if (data.statusCode) {
          console.log("Error 1", data)
          this.showPopUp = true
          this.popUpType = 'error'
        } else {
          console.log("Success", data)
          this.showPopUp = true
          this.popUpType = 'success'
        }

        this.reset()

      }).catch((err: any) => {
        console.log(err)
        this.showLoader = false
        this.popUpType = 'error'
        this.reset();
      });
  }

  reset() {

    setTimeout(() => {
      this.showPopUp = false
      this.popUpType = ''
      this.showLoader = false

    }, 2700);

    this.addRoomFormGroup.setValue({ name: '', location: '', file: '' });
    this.formdata.delete("files.image")
    this.fileInfo = { name: "", size: "" }


  }



  public onImageChange(event: Event) {

    let fileList = (event.target as HTMLInputElement).files
    console.log(fileList)
    if (fileList?.length) {
      let filesize = ((fileList[0].size / 1024) / 1024).toFixed(4);
      this.fileInfo = { "name": fileList[0].name, "size": filesize }
      console.log("File Size: " + filesize + " MB")
      this.formdata.append("files.image", fileList[0], fileList[0].name);
    }

  }


}
