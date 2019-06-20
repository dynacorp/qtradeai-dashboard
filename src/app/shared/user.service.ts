import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  image;
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  constructor(private http: HttpClient) { }


// BEGINING OF IMAGE TO BASE64
  changeListener($event): void {
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  const file: File = inputValue.files[0];
  const myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    // console.log(myReader.result);
  }
  myReader.readAsDataURL(file);
}
// END OF IMAGE TO BASE64


}
