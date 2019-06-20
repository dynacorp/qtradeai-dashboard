import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user.model';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  readonly rootUrl = 'http://192.168.88.22/royalty/sisibox/public/api';

  constructor(private http: HttpClient) { }

  // login(user: User) {
  //   const body: User = {
  //     username: user.username,
  //     password: user.password
  //   }
  //   return this.http.post(this.rootUrl + '/customer/login', body);
  //   }

}
