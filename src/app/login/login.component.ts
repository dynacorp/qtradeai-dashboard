import { AuthService } from '../shared/auth.service';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  readonly picUrl = 'https://apis.qtradeai.com/public';
  userid = this.SessionSt.retrieve('userid');
  loginUser: any;
  user: User;
  username: any;
  password: string;
  OnSubmit: any;

  constructor(private userService: UserService, private renderer: Renderer2, private el: ElementRef,
  private httpService: HttpClient,
  private http: HttpClient,
  private router: Router,
  private SessionSt: SessionStorageService,
  private authService: AuthService,
  private toastrService: ToastrService,
  private route: ActivatedRoute) {
   }


  ngOnInit() {
    if (this.userid !== null) {
    this.router.navigate(['/dashboard']);
  }else if (localStorage.getItem('_tmp_refr') !== null) {
    this.router.navigate(['/register']);
  }
  document.getElementById('loginload').style.visibility = 'hidden';
    this.renderer.removeClass(this.el.nativeElement, 'page-wrapper');
    // this.resetForm(userLoginForm);

    this.loginUser = function(user: User) {
    const body = {
      username: user.username,
      password: user.password
    }
    return this.http.post(this.rootUrl + '/customer/login',  {'data': body});
  }

  this.OnSubmit = function(userLoginForm: NgForm) {
    document.getElementById('loginload').style.visibility = 'visible';
        this.loginUser(userLoginForm.value)
            .subscribe((data: any = []) => {
              document.getElementById('loginload').style.visibility = 'hidden';

              if (data.error.status === '0') {
                this.SessionSt.store('username', userLoginForm.value.username);
                this.SessionSt.store('publicKey', data.content.data[0].publicKey);
                this.SessionSt.store('userID', data.content.data[0].userID);
                this.SessionSt.store('address', data.content.data[0].address);
                this.SessionSt.store('occupation', data.content.data[0].occupation);
                this.SessionSt.store('fullname', data.content.data[0].fullname);
                this.SessionSt.store('phone', data.content.data[0].phone);
                this.SessionSt.store('birthday', data.content.data[0].birthday);
                this.SessionSt.store('email', data.content.data[0].email);
                this.SessionSt.store('state', data.content.data[0].state);
                this.SessionSt.store('lg', data.content.data[0].lg);
                this.SessionSt.store('dateJoined', data.content.data[0].dateJoined);
                this.SessionSt.store('profileimage', this.picUrl + "/"+data.content.data[0].profile);
                this.toastrService.success('Login Successful', 'Successful', {
                timeOut: 3000,
              });
              this.router.navigateByUrl('/dashboard');
              window.location.reload();
              // this.resetForm(userLoginForm);
              }else {
                this.toastrService.error(data.error.message);
              }
            });
    }

}

onRegister($event) {
  this.router.navigate(['/register']);
}

forgot() {
  this.router.navigate(['/forgotpassword'])
}

}
