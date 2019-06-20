import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Component, OnInit } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  fullname = this.SessionSt.retrieve('fullname');
  occupation = this.SessionSt.retrieve('occupation');
  email = this.SessionSt.retrieve('email');
  phone = this.SessionSt.retrieve('phone');
  address = this.SessionSt.retrieve('address');
  userid = this.SessionSt.retrieve('userid');
  state = this.SessionSt.retrieve('state');
  lg = this.SessionSt.retrieve('lg');
  invest = this.SessionSt.retrieve('investorDetails');
  profileimage = this.SessionSt.retrieve('profileimage');
  OnSubmit: any;
  changePass: any;
  user: User;
  upload: any;
  updateProfile: any;
  fullnames: any;
  updateSelf: any;
  image: any;
  imageA: any;
  imageC: any;
  registerUser: any;
  changeListener: any;
  changeListenerA: any;
  changeListenerC: any;
  readThis: any;
  readThisA: any;
  readThisC: any;
  profileImage: any;
  updatePic: any;
  statesp: any;
  stateslgs: any;
  states: string [];
  stateslg: string [];
  selectedState: any;
  lgid: any;
  getSelectedState: any;
  MT4: any;
  MT4pass: any;
  updateKyc: any;

  constructor(private SessionSt: SessionStorageService, private httpService: HttpClient, private http: HttpClient,
  private userService: UserService,
  private toastrService: ToastrService,
  private router: Router) { }
  

  ngOnInit() {
    if (this.userid === null) {
        this.router.navigate(['/login']);
    }
    document.getElementById('loading').style.visibility = 'hidden';
    document.getElementById('loadingp').style.visibility = 'hidden';
    document.getElementById('loadingp2').style.visibility = 'hidden';
    this.upload = function() {
      $('#input-file-id').click();
    }
    this.updateProfile = function(user: User){
      const body = {
        fullname: user.fullname,
        phone: user.phone,
        address: user.address,
        occupation: user.occupation,
        email: user.email,
        state: user.state,
        lg: user.lg,
        'investorDetails': this.invest,
        'mt4': this.MT4,
        'mt4pass': this.MT4pass,
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
    this.changePass = function(user: User) {
      const body = {
      oldPassword: this.SessionSt.retrieve('password'),
      newPassword: user.npassword,
      username: this.SessionSt.retrieve('username'),
      publicKey: this.SessionSt.retrieve('publicKey'),
    }
    return this.http.put(this.rootUrl + '/customer/update/password',  {'data': body});
    }
    this.OnSubmit = function(changePassword: NgForm) {
      document.getElementById('loadingp').style.visibility = 'visible';
      if (changePassword.value.cpassword === changePassword.value.npassword && changePassword.value.cpassword !== '') {
      this.changePass(changePassword.value)
        .subscribe((data: any = []) => {
          // console.log(data);
          document.getElementById('loadingp').style.visibility = 'hidden';
          this.SessionSt.store('password', changePassword.value.cpassword);
          this.toastrService.success('Password changed successfully');
        })} else {
          document.getElementById('loadingp').style.visibility = 'hidden';
          this.toastrService.error('Password does not match');
        }
    }

   

    this.changeListenerA = function($event): void {
      this.readThisA($event.target);
    }

    this.changeListenerC = function($event): void {
      this.readThisC($event.target);
    }


    this.changeListener = function($event): void {
      this.readThis($event.target);

swal({
  title: 'Are you sure?',
  text: 'You are about to change your Profile Picture!',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, upload it!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    this.Pic();
  } else if (
    // Read more about handling dismissals
    result.dismiss === swal.DismissReason.cancel
  ) {
    swal(
      'Cancelled',
      'Your picture is safe :)',
      'error'
    )
  }
})
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

  this.readThisA = function(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.imageA = myReader.result;
    // console.log(this.image);
  }
  myReader.readAsDataURL(file);
  return myReader.result
}

this.readThisC = function(inputValue: any): void {
  const file: File = inputValue.files[0];
  const myReader: FileReader = new FileReader();

myReader.onloadend = (e) => {
  this.imageC = myReader.result;
  // console.log(this.image);
}
myReader.readAsDataURL(file);
return myReader.result
}

this.updateKyc = function(){
  const body = {
    countryID: this.imageA,
    addressID: this.imageC,
    username: this.SessionSt.retrieve('username'),
    userID: this.SessionSt.retrieve('userid'),
    publicKey: this.SessionSt.retrieve('publicKey')
  }
  // console.log(body);
  return this.http.post(this.rootUrl + '/customer/create/kyc', {'data': body});
}

    this.updatePic = function(user: User){
      const body: User = {
        profileImage: this.image,
        username: this.SessionSt.retrieve('username'),
        userID: this.SessionSt.retrieve('userid'),
        publicKey: this.SessionSt.retrieve('publicKey')
      }
      // console.log(body);
      return this.http.put(this.rootUrl + '/customer/update/profileImage', {'data': body});
    }

    this.httpService.get('https://apis.sisibox.com/public/api/get/states').subscribe((res : any[0])=>{
    // console.log(res.content.data);
    this.states = res.content.data;
  });
  
    this.httpService.get('https://apis.sisibox.com/public/api/get/lgs/' + this.SessionSt.retrieve('state')).subscribe((res : any[0])=>{
      this.stateslg = res.content.data;
    // console.log(this.stateslg);
      });

    this.getSelectedState = function() {
      this.lgid = this.state;
      this.httpService.get('https://apis.sisibox.com/public/api/get/lgs/' + this.lgid).subscribe((res : any[0])=>{
      this.stateslg = res.content.data;
    // console.log(this.stateslg);
      });
    }

  }

  kycsubmit() {
    document.getElementById('loadingp2').style.visibility = 'visible';
    this.updateKyc().subscribe((data: any = []) => {
          if (data.error.status === '0') {
            document.getElementById('loadingp2').style.visibility = 'hidden';
            this.toastrService.success('Kyc Updated Successfully', 'Successful', {
              timeOut: 3000, });
              // location.reload();
          }else {
            document.getElementById('loadingp2').style.visibility = 'hidden';
            this.toastrService.error(data.error.message);
          }
        });
    }

  Pic() {
  this.updatePic().subscribe((data: any = []) => {
        if (data.error.status === '0') {
          this.SessionSt.store('profileimage', this.image);
          // swal(
          //       'Updated!',
          //       'Your Picture has been Updated.',
          //       'success'
          //     )
          this.toastrService.success('Picture Updated Successfully', 'Successful', {
            timeOut: 3000, });
            location.reload();
        }else {
          this.toastrService.error('Sorry! An error occured!');
        }
      });
  }

  submitUp(updateSelf: NgForm) {
    document.getElementById('loading').style.visibility = 'visible';
    this.updateProfile(updateSelf.value)
      .subscribe((data: any = []) => {
        // console.log(data)
        if (data.error.status === '0') {
          document.getElementById('loading').style.visibility = 'hidden';
        this.SessionSt.store('fullname', updateSelf.value.fullname);
        this.SessionSt.store('phone', updateSelf.value.phone);
        this.SessionSt.store('address', updateSelf.value.address);
        this.SessionSt.store('email', updateSelf.value.email);
        this.SessionSt.store('state', updateSelf.value.state);
        this.SessionSt.store('lg', updateSelf.value.lg);
        this.SessionSt.store('investorDetails', this.invest);
          this.toastrService.success('Profile updated Successfully', 'Successful', {
            timeOut: 3000, });
            location.reload();
        }else {
          document.getElementById('loading').style.visibility = 'hidden';
          this.toastrService.error('An Error Occurred!');
        }
      });
  }

}
