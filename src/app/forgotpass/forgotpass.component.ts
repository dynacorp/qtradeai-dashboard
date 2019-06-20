import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  userid = this.SessionSt.retrieve('userid');
  forgot: any;
  user: User;
  OnSubmit: any;

  constructor(private router: Router,
  private SessionSt: SessionStorageService,
  private userService: UserService,
  private toastrService: ToastrService,
  private http: HttpClient) { }

  ngOnInit() {
    this.forgot = function(user: User) {
      const body = {
        email: user.email,
        username: user.username
      }
      return this.http.post(this.rootUrl + '/customer/retrieve/password/1',  {'data': body});
    }

    this.OnSubmit = function(fpass: NgForm) {
      $('#reset').html('reseting...');
        this.forgot(fpass.value).subscribe((data: any = []) => {
          // console.log(data)
          if (data.error.status !== '1') {
            $('#reset').html('reset');
            this.toastrService.success(data.success.message, 'Successful', {
              timeOut: 3000, });
          } else {
            this.toastrService.error(data.error.message, 'Failed', {
              timeOut: 3000, });
              $('#reset').html('reset');
          }

        })
    }
  }

  signin() {
    this.router.navigate(['/login'])
  }

}
