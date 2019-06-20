import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { User } from '../shared/user.model';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable()
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  userid = this.SessionSt.retrieve('userid');
  ref = this.SessionSt.store('ref', '_QT');
  user: User;
  statesp: any;
  states: string [];
  stateslg: string [];
  selectedState: any;
  lgid: any;
  getSelectedState: any;
  image: any;
  registerUser: any;
  changeListener: any;
  readThis: any;
  profileImage: any;
  public href: string;
  parent: string;
  country: string;

  constructor(private userService: UserService, private renderer: Renderer2, private el: ElementRef,
  private httpService: HttpClient,
  private http: HttpClient,
  private router: Router,
  private SessionSt: SessionStorageService,
  private LocalSt: LocalStorageService,
  private toastrService: ToastrService) { }


  ngOnInit() {
    // console.log(localStorage.getItem('_tmp_refr'))

    if (this.userid !== null) {
    this.router.navigate(['/dashboard']);
  }

  // if (localStorage.getItem('_tmp_refr') === 'login') {
  //   localStorage.removeItem('_tmp_refr');
  //   this.router.navigate(['/login']);
  //  }

  if (localStorage.getItem('_tmp_refr') !== null) {
    this.parent = localStorage.getItem('_tmp_refr');
   } else {
     this.parent = this.SessionSt.retrieve('ref');
   }


  document.getElementById('loginload').style.visibility = 'hidden';

    this.httpService.get('https://apis.qtradeai.com/public/api/get/countries').subscribe((res : any[0])=>{
    // console.log(res.content.data);
    this.states = res.content.data;
    });

    this.getSelectedState = function() {
      this.lgid = this.statesp;
      this.httpService.get('https://qtradeai.sisibox.com/s/public/api/get/lgs/' + this.lgid).subscribe((res : any[0])=>{
      this.stateslg = res.content.data;
    // console.log(this.stateslg);
      });
    }

    this.changeListener = function($event): void {
      this.readThis($event.target);
    }

    this.readThis = function(inputValue: any): void {
      const file: File = inputValue.files[0];
      const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
      // console.log(this.image);
    }
    myReader.readAsDataURL(file);
    return myReader.result
  }

   this.registerUser = function(user: User) {
      const body: User = {
      username: user.username,
      password: user.password,
      email: user.email,
      fullname: user.fullname,
      occupation: user.occupation,
      parent: this.parent,
      address: user.address,
      phone: user.phone,
      birthday: user.birthday,
      state: this.statesp,
      profileImage: this.image
    }
    return this.http.post(this.rootUrl + '/customer/create/self', {'data': body});
  }

  }




  onSignin($event) {
    localStorage.clear();
  this.router.navigate(['/login']);
  }

  termChanged() {
    const a = <HTMLInputElement>document.getElementById('terms');
    if (a.checked === true) {
    $('#submit').removeAttr('disabled');
    }else if (a.checked === false) {
      $('#submit').attr('disabled', 'disabled');
    }
  }


  OnSubmit(form: NgForm) {
    document.getElementById('loginload').style.visibility = 'visible';
    this.registerUser(form.value)
      .subscribe((data: any = []) => {
        if (data.error.status === '0') {
          document.getElementById('loginload').style.visibility = 'hidden';
          this.SessionSt.store('username', form.value.username);
          this.toastrService.success(data.success.message, 'Successful', {
            timeOut: 3000, });
            form.reset();
            localStorage.clear();
          this.router.navigate(['/login']);
        }else {
          document.getElementById('loginload').style.visibility = 'hidden';
          this.toastrService.error(data.error.message);
        }
      });
  }



}
