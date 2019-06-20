import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders, HttpRequest  } from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  userid = this.SessionSt.retrieve('userid');
  username = this.SessionSt.retrieve('username');
  publicKey = this.SessionSt.retrieve('publicKey');
  fullname = this.SessionSt.retrieve('fullname');
  occupation = this.SessionSt.retrieve('occupation');
  email = this.SessionSt.retrieve('email');
  phone = this.SessionSt.retrieve('phone');
  address = this.SessionSt.retrieve('address');
  state = this.SessionSt.retrieve('state');
  lg = this.SessionSt.retrieve('lg');
  profileimage = this.SessionSt.retrieve('profileimage');
  banks: any;
  mybanks: any;
  banksd: any;
  createBank: any;
  accountNumber: any;
  accountNumbers: any;
  accountName: any;
  accountNames: any;
  reload: any;
  deleteBank: any;
  sel: any;
  ref1: any;
  ref2: any;
  ref3: any;
  swal: any;
  withdraw: any;
  banksf: any;
  amountw: any;
  wpasss: any;
  balance: any;
  transfer: any;
  tpasss: any;
  amountt: any;
  mybanksL: any;
  bene: any;
  bmcAdd: any;
  updateProfile: any;

  constructor(private router: Router,
  private SessionSt: SessionStorageService,
  private httpService: HttpClient,
  private http: HttpClient,
  private toastrService: ToastrService,
  private userService: UserService) { }

  ngOnInit() {
    if (this.userid === null) {
    this.router.navigate(['/login']);
  }
  document.getElementById('loadingt').style.visibility = 'hidden';
  document.getElementById('loadingw').style.visibility = 'hidden';
  document.getElementById('loadingp').style.visibility = 'hidden';
  document.getElementById('loadingBM').style.visibility = 'hidden';
  const headers = new Headers();

  this.updateProfile = function(user: User){
    const body = {
      fullname: this.fullname,
      phone: this.phone,
      address: this.address,
      occupation: this.occupation,
      email: this.email,
      state: this.state,
      lg: this.lg,
      BMWalletAddress: this.bmcAdd,
      username: this.SessionSt.retrieve('username'),
      publicKey: this.SessionSt.retrieve('publicKey'),
      userID: this.SessionSt.retrieve('userid')
    }
    // console.log(body);
    return this.http.put(this.rootUrl + '/customer/update/self', {'data': body}, {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    // .set('userID', this.SessionSt.retrieve('userid'))
    // .set('username', this.SessionSt.retrieve('username'))
    // .set('publicKey', this.SessionSt.retrieve('publicKey'))
  });
  }

  this.httpService.get(this.rootUrl + '/customer/get/bank', {
      headers: new HttpHeaders().set('userID', this.SessionSt.retrieve('userid'))
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
    }).subscribe((res : any[0])=>{
    this.mybanks = res.content.data;
    this.mybanksL = res.content.data.length;
    // console.log(this.mybanksL)
    if(this.mybanksL === '1') {
      this.SessionSt.store('bank', '1')
    } else{
      this.SessionSt.store('bank', '0')
    }
  });

  this.httpService.get(this.rootUrl + '/get/banks').subscribe((res : any[0])=>{
    this.banks = res.content.data;
  });

  this.createBank = function(banksd, accountNumbers, accountNames, createBank: NgForm) {
      const body = {
      'bankName': this.banksd,
      'accountNumber': this.accountNumbers,
      'accountName': this.accountNames ,
      'userID': this.userid,
      'publicKey': this.publicKey,
      'username': this.username

    }
    return this.http.post(this.rootUrl + '/customer/create/bank', {'data': body});
  }

  this.withdraw = function(banksf, amount, wpass) { 
      const body = {
      'bankID': this.banksf,
      'amount': this.amountw,
      'password': this.wpasss,
      'userID': this.userid,
      'publicKey': this.publicKey,
      'username': this.username

    }
    // console.log(body)
    return this.http.post(this.rootUrl + '/customer/create/withdrawal', {'data': body});
  }

  this.transfer = function(ben, tamount, tpass) { 
      const body = {
      'beneficiary': this.bene,
      'amount': this.amountt,
      'password': this.tpasss,
      'userID': this.userid,
      'publicKey': this.publicKey,
      'username': this.username

    }
    // console.log(body)
    return this.http.post(this.rootUrl + '/customer/create/transfer', {'data': body});
  }

  this.deleteBank = function(selectedItem: any) {
      const body = {
      'bankID': this.sel,
      'userID': this.userid,
      'publicKey': this.publicKey,
      'username': this.username

    }
    return this.http.put(this.rootUrl + '/customer/delete/bank', {'data': body});
  }

  // this.httpService.get(this.rootUrl + '/customer/get/referrals', {
  //     headers: new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('username', this.SessionSt.retrieve('username'))
  //     .set('publicKey', this.SessionSt.retrieve('publicKey'))
  //     .set('userID', this.SessionSt.retrieve('userid'))
  //   }).subscribe((data: any = []) => {
  //     this.ref1 = data.content.data.levelOne[0].fullname;
  //     this.ref2 = data.content.data.levelTwo;
  //     this.ref3 = data.content.data.levelThree;
  //   });


  this.httpService.get(this.rootUrl + '/customer/get/balance', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.balance = data.content.data[0].totalDue
    });

}
 

onSelect(selectedItem: any) {
  this.sel = selectedItem.id;
  this.deleteBank()
  .subscribe((data: any = []) => {
    if (data.error.status === '0') {
      this.SessionSt.store('bank', '0');
            location.reload();
          this.toastrService.success('The bank was successfully removed', 'Successful', {
            timeOut: 3000, });
        }else {
          this.toastrService.error(data.error.message);
        }
  });
}


OnSubmitW(withdraw: NgForm) {
  if (this.amountw !== undefined || this.wpasss !== undefined) {
  document.getElementById('loadingw').style.visibility = 'visible';
    this.withdraw()
      .subscribe((data: any = []) => {
        if (data.error.status === '0') {
          document.getElementById('loadingw').style.visibility = 'hidden';
            location.reload();
          this.toastrService.success('Withdraw Successful', 'Successful', {
            timeOut: 30000, });
        }else {
          document.getElementById('loadingw').style.visibility = 'hidden';
          this.toastrService.error(data.error.message);
        }
      });
  }else {
    this.toastrService.error('Error in Details!');
  }
}

OnSubmitT(transfer: NgForm) {
  if (this.amountt !== undefined || this.tpasss !== undefined) {
  document.getElementById('loadingt').style.visibility = 'visible';
    this.transfer()
      .subscribe((data: any = []) => {
        if (data.error.status === '0') {
          document.getElementById('loadingt').style.visibility = 'hidden';
            location.reload();
          this.toastrService.success('Transfer Successful', 'Successful', {
            timeOut: 30000, });
        }else {
          document.getElementById('loadingt').style.visibility = 'hidden';
          this.toastrService.error(data.error.message);
        }
      });
  }else {
    this.toastrService.error('Error in Details!');
  }
  }

OnSubmit(createBank: NgForm) {
  // if (this.mybanksL === '1') {
  //         swal({
  //           type: 'error',
  //           text: 'cannot create more than ONE bank<br>Contact admin',
  //           showConfirmButton: true,
  //           confirmButtonText: 'Call Admin',
  //           timer: 3000
  //         }).then(() => {
  //           this.OnExclusive()
  //         })
  //       }
  if (this.SessionSt.retrieve('bank') === '0') {
  document.getElementById('loadingp').style.visibility = 'visible';
    this.createBank()
      .subscribe((data: any = []) => {
        if (data.error.status === '0') {
          document.getElementById('loadingp').style.visibility = 'hidden';
          this.toastrService.success('Bank Added Successfully', 'Successful', {
            timeOut: 3000, });
            createBank.reset();
            this.SessionSt.store('bank', '1');
            location.reload();
        }else {
          document.getElementById('loadingp').style.visibility = 'hidden';
          this.toastrService.error('An Error Occurred!');
        }
      });
  }else {
    this.toastrService.error('Bank cannot be more than one or Error in Account Details!');
  }
}

OnExclusive() {
    document.location.href = 'tel:+2348035870063';
  }

submitUp(createBmcadd: NgForm) {
    document.getElementById('loadingBM').style.visibility = 'visible';
    this.updateProfile(createBmcadd.value)
      .subscribe((data: any = []) => {
        // console.log(data)
        if (data.error.status === '0') {
          document.getElementById('loadingBM').style.visibility = 'hidden';
        this.SessionSt.store('BMWalletAddress', createBmcadd.value.address);
          this.toastrService.success('Address Added Successfully', 'Successful', {
            timeOut: 3000, });
            location.reload();
        }else {
          document.getElementById('loadingBM').style.visibility = 'hidden';
          this.toastrService.error('An Error Occurred!');
        }
      });
  }



}
