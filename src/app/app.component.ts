
import { DatePipe } from '@angular/common';
import { Component,  DoCheck,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { __assign } from 'tslib';
import { Form, FormImageData } from './formdate';
import { ServerService } from './server.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck  {

  constructor(private datepipe: DatePipe, private _msg:ServerService) {
  }

  ngOnInit(): void {
    this.getAllRecords();
  }
  ngDoCheck(): void {
    this.calculateAge();
  }
  @ViewChild('fileUploader') fileUploader!: ElementRef;

  imgurl: string = "";
  arrayIndex: number = 0;
  IsEdit: boolean = false;
  updateid: number = 0;
  title = 'CRUD';
  agree: boolean = false;
  updatebut: any;
  id: number = 0;
  fname: string = "";
  lname: string = "";
  email: string = "";
  mobile: string = "";
  gender: string = "";
  dob: string = this.datepipe.transform(Date.now(), "yyyy-MM-dd") || "";
  toyear: string = this.datepipe.transform(Date.now(), 'yyyy') || "";
  age: any;
  month: any;
  userage: string='';
  formdata: any[] = [];
  imgdata: any[] = [];
  imgCount: number = 0;
  FormImageData: any[] = [];

  readFile(fileEvent: any) {
    // console.log(fileEvent);
    // const file = fileEvent.target.files[0];
    // if (file.size < 5120) {
    //   alert("You can upload file with maximum 5 mb of size");
    //   fileEvent = "";
    // }
    // this.imgurl= "/assets/" + file.name;
    // // const url = "../../assets/" + file.name;
    // // this.imgurl = url.base64 as string;
    const file = fileEvent.target.files[0];
    if (file.size < 5120) {
      alert("You can upload upto 5MB size of image only");
    } else {
      var myReader: FileReader = new FileReader();
      myReader.readAsDataURL(file);
      myReader.onloadend = () => {
      this.imgurl = myReader.result as string;
      this.AddImage();
      };
    }
  }

  validateMobile(): boolean {
    let isValid: boolean = true;
    let msg: string = "";
    const checkEmail = this.formdata.find((item) => item.email?.trim() === this.email?.trim());
    const checkPhone = this.formdata.find((item) => item.mobile === this.mobile);
    if (checkEmail) msg += 'Email ID already exist.\n'
    if (checkPhone) msg += 'Mobile number already exist.\n';
    if (msg) {
      alert(msg);
      isValid=false
    }
    return isValid
  }

  // to get data
  getAllRecords() {
    this._msg.getFormData().subscribe((res: any) => {
      this.formdata = res;
      // this.formdata.map((items: any) => {
      //   items.imgCount = items.imgData?.length;
      // });
      this.formdata.forEach((_item: any) => {
        // console.log(item.imgData.length);
      })

      // console.log(this.formdata);
    })
  }

  add(_get: any) {
    if (this.fname.trim() == "" ) {
      alert("Firstname is mandatary");
    } else if (this.lname.trim() == "") {
      alert("Lastname is mandatary");
    } else if (this.mobile.trim() == "") {
      alert("Mobile is mandatary");
    } else if (this.email.trim() == "") {
      alert("Email is mandatary");
    }else if (this.gender.trim() == "") {
      alert("Gender is mandatary");
    } else {
      if (!this.IsEdit) {
        debugger;
        if (!this.validateMobile()) return;
        const TempModel = new FormImageData();
        TempModel.imgUrl = [...this.imgdata];
        TempModel.imgCount = this.imgdata.length;
        // this.FormImageData.push(TempModel);
        const saveModel = new Form();
        saveModel.firstName = this.fname;
        saveModel.lastName = this.lname;
        saveModel.email = this.email;
        saveModel.mobile = this.mobile;
        saveModel.dob = this.dob;
        saveModel.userage = this.userage;
        saveModel.gender = this.gender;
        saveModel.imgdata = TempModel;
        this.calculateAge();
        this._msg.postFormData(saveModel).subscribe((_res: any) => {
          this.getAllRecords();
        })
        this.fileUploader.nativeElement.value = null;
      } else {
        const TempModel = new FormImageData();
        TempModel.imgUrl = [...this.imgdata];
        TempModel.imgCount = this.imgdata.length;
        const saveModel = new Form();
        saveModel.id = this.id;
        saveModel.firstName = this.fname;
        saveModel.lastName = this.lname;
        saveModel.email = this.email;
        saveModel.mobile = this.mobile;
        saveModel.dob = this.dob;
        saveModel.userage = this.userage;
        saveModel.gender = this.gender;
        saveModel.imgdata = TempModel;
        this.calculateAge();
        this._msg.updateformdata(this.id , saveModel).subscribe((_res: any) => {
          this.getAllRecords();
        })
      }
      this.clearFields();
    }
  }

  remove(id: any) {
    let conf= confirm("Are you sure ? You want to clear all data");
     if (conf==true) {
     // this.formdata = [];
      this._msg.deleteFormData(id).subscribe((_res: any) => {
      this.getAllRecords();
    })
     }

  }

  // clearall() {
  //   //   let conf= confirm("Are you sure ? You want to clear all data");
  //   //  if (conf==true) {
  //   //  // this.formdata = [];
  //   //    this._msg.deleteallformdata().subscribe((res: any) => {
  //   //   this.getAllRecords();
  //   // })
  //   //  } else {
  //   //    return;
  //   //  }
  //   // this.formdata.splice(del)
  // }

  edit(ed: any, index: number) {
    this.agree = true;
    this.IsEdit = true;
    this.id = index;
    this.fname = ed.firstName;
    this.lname = ed.lastName;
    this.email = ed.email;
    this.mobile = ed.mobile;
    this.dob = ed.dob;
    this.userage = ed.userage;
    this.gender = ed.gender;
    this.imgdata = ed.imgdata.imgUrl;
    this.updateid = index;
  }

  clearFields() {
    this.fname = "";
    this.lname = "";
    this.email = "";
    this.mobile = "";
    this.fname = "";
    this.dob = this.datepipe.transform(Date.now(), "yyyy-MM-dd") || "";
    this.gender = "";
    this.imgurl = "";
    this.agree = false;
    this.userage = '';
    this.IsEdit = false;
    this.imgdata = [];
    this.fileUploader.nativeElement.value = null;
  }

  calculateAge() {
    let birthYear = this.datepipe.transform(this.dob, "yyyy") || "0";
    let year = this.datepipe.transform(Date.now(), 'yyyy') || "0";
    this.age = parseInt(year) - parseInt(birthYear);
    let birthmonth = this.datepipe.transform(this.dob, "MM") || "0";
    let month = this.datepipe.transform(Date.now(), 'MM') || "0";
    this.month = month >= birthmonth ? parseInt(month) - parseInt(birthmonth) : 12 + parseInt(month) - parseInt(birthmonth) ;
    this.userage = `${this.age} year ${this.month} months old`;
  }

  arrayDown(index: number, direction: boolean) {
    let temp = [];
    if (!direction) {
      temp = this.formdata[index];
      this.formdata[index] = this.formdata[index + 1];
      this.formdata[index + 1] = temp;
    } else {
      temp = this.formdata[index - 1];
      this.formdata[index - 1] = this.formdata[index];
      this.formdata[index] = temp;
    }

  }

  AddImage() {
    this.imgdata.push(this.imgurl);
    this.imgCount = this.imgdata.length;
    console.log(this.imgCount);
  }
}

