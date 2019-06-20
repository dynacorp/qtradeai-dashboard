import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Component, OnInit } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  readonly API_publicKey = 'FLWPUBK-2233204600932dd6471efd4b2a21c860-X';
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  userid = this.SessionSt.retrieve('userid');
  username = this.SessionSt.retrieve('username');
  publickey = this.SessionSt.retrieve('publicKey');
  fullname = this.SessionSt.retrieve('fullname');
  basic: any;
  swal: any;
  premium: any;
  regular: any;
  basicData: any;
  premiumData: any;
  regularData: any;
  statesp: any;
  getSelectedState: any;
  states: any;
  getSelectedLg: any;
  lgs: any;
  submitBasic: any;
  submitRegular: any;
  submitPremium: any;
  submitpreBasic: any;
  pick: any;
  pac: any;
  coun: any;
  prebasicP: any;
  basicP: any;
  regularP: any;
  premiumP: any;
  price: any;
  prebasicPI: any;
  basicPI: any;
  regularPI: any;
  premiumPI: any;
  getSelectedPicker: any;
  id: any;
  paypreBasic: any;
  payBasic: any;
  balance: any;
  payRegular: any;
  payPremium: any;
  call: any;
  amount: any;
  padii: any;
  pack: any;
  always: any;
  prettyintimate: any;
  softcare: any;
  ladycare: any;
  virony: any;
  stateslg: any;
  pickup: any;
  patner: any;
  raveAmount: any;
  raveID: any;
  getpaidSetup: any;
  pickupL: any;
  transb: boolean;
  vivi: any;
  pack2: any;

  pads = [
       {id: 1, name: 'always'},
       {id: 2, name: 'pretty intimate'},
       {id: 3, name: 'soft care'},
       {id: 4, name: 'lady care'},
       {id: 5, name: 'virony'}
     ];


  constructor(private httpService: HttpClient,
    private SessionSt: SessionStorageService,
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
    if (this.userid === null) {
    this.router.navigate(['/login']);
  }
  localStorage.setItem('third', '0');

  let rp = sessionStorage.getItem('pstat');
  if (rp === 't') {
    swal({
      type: 'success',
      title: 'Payment Successful!',
      showConfirmButton: false,
      timer: 3000
    })
  }else if (rp === 'f') {
    swal({
          type: 'error',
          title: 'Payment Failed!',
          showConfirmButton: false,
          timer: 3000
        })
  }
  sessionStorage.removeItem('pstat');
  this.call = '+2348035870063';
  document.getElementById('loading').style.visibility = 'hidden';
  document.getElementById('loading1').style.visibility = 'hidden';
  document.getElementById('loading2').style.visibility = 'hidden';
  document.getElementById('loading3').style.visibility = 'hidden';
    const headers = new Headers();

    // this.httpService.get(this.rootUrl + '/customer/get/balance', {
    //   headers: new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('username', this.SessionSt.retrieve('username'))
    //   .set('publicKey', this.SessionSt.retrieve('publicKey'))
    //   .set('userID', this.SessionSt.retrieve('userid'))
    // }).subscribe((data: any = []) => {
    //   this.balance = data.content.data[0].totalDue
    // });

    this.httpService.get('https://apis.qtradeai.com/public/api/get/packages').subscribe((res : any[0])=>{
    // console.log(res.content.data);
    this.pack = res.content.data;
    this.basicP = res.content.data[0].price;
    this.regularP = res.content.data[1].price;
    // this.premiumP = res.content.data[2].price;
    // this.prebasicP = res.content.data[3].price;
    this.basicPI = res.content.data[0].id;
    this.regularPI = res.content.data[1].id;
    // this.premiumPI = res.content.data[2].id;
    // this.prebasicPI = res.content.data[3].id;
    console.log(res.content.data[0].id);
    });

    // this.httpService.get('https://apis.qtradeai.com/public/api/get/states').subscribe((res : any[0])=>{
    // console.log(res.content.data);
    // this.states = res.content.data;
    // });

    // this.getSelectedState = function() {
    //   document.getElementById('loading').style.visibility = 'visible';
    //   document.getElementById('loading1').style.visibility = 'visible';
    //   document.getElementById('loading2').style.visibility = 'visible';
    //   document.getElementById('loading3').style.visibility = 'visible';
    //     this.lgid = this.statesp;
    //     this.httpService.get('https://apis.qtradeai.com/public/api/get/lgs/' + this.lgid).subscribe((res : any[0])=>{
    //     this.stateslg = res.content.data;
    //     console.log(this.stateslg);
    //     document.getElementById('loading').style.visibility = 'hidden';
    //     document.getElementById('loading1').style.visibility = 'hidden';
    //     document.getElementById('loading2').style.visibility = 'hidden';
    //     document.getElementById('loading3').style.visibility = 'hidden';
    //     });
    //   }

    //   this.getSelectedLg = function() {
    //     document.getElementById('loading').style.visibility = 'visible';
    //     document.getElementById('loading1').style.visibility = 'visible';
    //     document.getElementById('loading2').style.visibility = 'visible';
    //     document.getElementById('loading3').style.visibility = 'visible';
    //     this.pat = this.lgs;
    //     console.log(this.lgs)
    //     this.httpService
    //     .get('https://apis.qtradeai.com/public/api/customer/get/area/-/' + this.lgid + '/' + this.pat,
    //     {
    //   headers: new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('userID', this.SessionSt.retrieve('userid'))
    //   .set('username', this.SessionSt.retrieve('username'))
    //   .set('publicKey', this.SessionSt.retrieve('publicKey'))
    // }).subscribe((res: any) => {
    //   this.pickup = res.content.data;
    //   this.pickupL = res.content.data.lenght;
    //   document.getElementById('loading').style.visibility = 'hidden';
    //   document.getElementById('loading1').style.visibility = 'hidden';
    //   document.getElementById('loading2').style.visibility = 'hidden';
    //   document.getElementById('loading3').style.visibility = 'hidden';
    //     console.log(this.pickup)
    //     });
    //   }

    //   this.getSelectedPicker = function() {
    //     document.getElementById('loading').style.visibility = 'visible';
    //     document.getElementById('loading1').style.visibility = 'visible';
    //     document.getElementById('loading2').style.visibility = 'visible';
    //     document.getElementById('loading3').style.visibility = 'visible';
    //     this.area = this.pick;
    //     console.log(this.pick)
    //     this.httpService
    //     .get('https://apis.qtradeai.com/public/api/customer/get/partner/-/' + this.area,
    //     {
    //   headers: new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('userID', this.SessionSt.retrieve('userid'))
    //   .set('username', this.SessionSt.retrieve('username'))
    //   .set('publicKey', this.SessionSt.retrieve('publicKey'))
    // }).subscribe((res : any) => {
    //   document.getElementById('loading').style.visibility = 'hidden';
    //   document.getElementById('loading1').style.visibility = 'hidden';
    //   document.getElementById('loading2').style.visibility = 'hidden';
    //   document.getElementById('loading3').style.visibility = 'hidden';
    //     this.patner = res.content.data;
    //     console.log(this.patner)
    //     });
    //   }

    this.pack2 = function(x) {
      const body = {
      'amount': x.price,
      'count': '1',
      'package': x.id,
      'userID': this.userid,
      'publicKey': this.publickey,
      'username': this.username

    }
    console.log(body)
    return this.http.post(this.rootUrl + '/customer/create/order', {'data': body});
  }

      this.submitpreBasic = function(pac, coun, padii) {
      const body = {
      'amount': this.prebasicP,
      'count': '1',
      'package': this.prebasicPI,
      'userID': this.userid,
      'publicKey': this.publickey,
      'username': this.username

    }
    // console.log(body)
    return this.http.post(this.rootUrl + '/customer/create/order', {'data': body});
  }

      this.submitBasic = function(pac, coun, padii) {
      const body = {
      'amount': this.basicP,
      'count': '1',
      'package': this.basicPI,
      'userID': this.userid,
      'publicKey': this.publickey,
      'username': this.username

    }
    console.log(body)
    return this.http.post(this.rootUrl + '/customer/create/order', {'data': body});
  }

  this.submitRegular = function(pac, coun, padii) {
      const body = {
      'amount': this.regularP,
      'count': this.coun,
      'padType': this.padii,
      'package': this.regularPI,
      'pickUp': this.pac,
      'userID': this.userid,
      'publicKey': this.publickey,
      'username': this.username

    }
    return this.http.post(this.rootUrl + '/customer/create/order', {'data': body});
  }

  this.submitPremium = function(pac, coun, padii) {
      const body = {
      'amount': this.premiumP,
      'count': this.coun,
      'padType': this.padii,
      'package': this.premiumPI,
      'pickUp': this.pac,
      'userID': this.userid,
      'publicKey': this.publickey,
      'username': this.username

    }
    return this.http.post(this.rootUrl + '/customer/create/order', {'data': body});
  }



}

// preBasicSwal() {
//   swal({
//               title: 'Order?',
//               html: 'Are you sure you want to order Pre-BASIC Package(s)?',
//               type: 'question',
//               showCancelButton: true
//             }).then((result) => {
//               if (result.value) {
//                 this.OnpreBasic()
//               }
//             });
// }

//   OnpreBasic() {
//     swal({
//       title: 'Please Wait..!',
//       text: 'working..',
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//       allowEnterKey: false,
//       onOpen: () => {
//           swal.showLoading()
//       }
//   })
//     this.submitpreBasic()
//       .subscribe((data: any = [0]) => {
//         if (data.error.status === '0') {
//           this.id = data.success.orderID
//           this.amount = data.success.amount
//           this.toastrService.success('Order has been generated Successfully', 'Successful', {
//             timeOut: 3000, });
//             const b = this.balance
//             swal({
//               title: 'Payment!',
//               html: 'Choose your model of Payment.<br> <strong style="font-weight: 30px !important">Wallet: </strong>' + b + '</br>' + '<button id="panel3" type="button" class="btn btn-primary" style="margin-top: 5%; color: white">Transfer / Deposit</button>',
//               type: 'question',
//               showCloseButton: false,
//               allowOutsideClick: false,
//               allowEscapeKey: false,
//               allowEnterKey: false,
//               showCancelButton: true,
//               confirmButtonText: 'Wallet Payment',
//               cancelButtonText: 'Card Payment',
//               reverseButtons: true
//             }).then((result) => {
//               if (result.value) {
//                 const wallet = '1'
//                 this.paypreBasic = function() {
//                   const body = {
//                   'amount': this.amount,
//                   'method': wallet,
//                   'orderID': this.id,
//                   'userID': this.userid,
//                   'publicKey': this.publickey,
//                   'username': this.username
//                 }
//                 return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
//               }
//               this.preBasic2()
//               } else if (result.dismiss === swal.DismissReason.cancel) {
//                 const card = '2'
//                 this.paypreBasic = function() {
//                   const body = {
//                   'amount': this.amount,
//                   'method': card,
//                   'orderID': this.id,
//                   'userID': this.userid,
//                   'publicKey': this.publickey,
//                   'username': this.username
//                 }
//                 return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
//               }
//               this.preBasic()
//               } else if (result.dismiss === swal.DismissReason.close) {
//                 const transfer = '3'
//                 this.paypreBasic = function() {
//                   const body = {
//                   'amount': this.amount,
//                   'method': transfer,
//                   'orderID': this.id,
//                   'userID': this.userid,
//                   'publicKey': this.publickey,
//                   'username': this.username
//                 }
//                 return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
//               }
//               this.preBasic3()
//               }

//             })
//             $(document).on('click', '#panel3', function() {
//               $('.swal2-close').click()
//             });
//           }  else if (data.error.status === '1') {
//             swal.close()
//             swal({
//               type: 'error',
//               title: data.error.message,
//               showConfirmButton: false,
//               timer: 3000
//             })
//           }
//       });
//   }

//   preBasic3() {
//     swal({
//       title: 'Please Wait..!',
//       text: 'working..',
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//       allowEnterKey: false,
//       onOpen: () => {
//           swal.showLoading()
//       }
//   })
//     this.paypreBasic()
//     .subscribe((res: any = []) => {
//       if (res.error.status === '0') {
//                     swal.close();
//                     this.toastrService.success(res.success.message);
//                     swal({
//                       type: 'success',
//                       html: '<b>Payment ID: </b>' + res.content.paymentID + '</br>' + '<b> Amount: </b>' + res.content.amount + '</br>' +
//                       '<b>Account Name: </b>' + res.content.account.accountName + '</br>' +
//                       '<b>Bank Name: </b>' + res.content.account.bankName + '</br>' +
//                       '<b>Account Number: </b>' + res.content.account.accountNumber,
//                       title: 'Make a Transfer or Deposit',
//                       showConfirmButton: true,
//                       allowOutsideClick: false,
//                       allowEscapeKey: false,
//                       allowEnterKey: false,
//                       confirmButtonText: '<i class="fa fa-upload"></i> Upload Proof!',
//                       confirmButtonAriaLabel: 'Upload Proof!',
//                     }).then((result) => {
//                       if (result.value) {
//                         this.router.navigate(['/log'])
//                       }
//                     })
//       } else {
//         swal({
//           type: 'error',
//           title: res.error.message,
//           showConfirmButton: false,
//           timer: 3000
//         })
//       }
//     });
//   }

//   preBasic2() {
//     swal({
//       title: 'Please Wait..!',
//       text: 'working..',
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//       allowEnterKey: false,
//       onOpen: () => {
//           swal.showLoading()
//       }
//   })
//     this.paypreBasic()
//     .subscribe((data: any = []) => {
//       if (data.error.status === '0') {
//         swal.close();
//         swal({
//           type: 'success',
//           title: data.success.message,
//           showConfirmButton: false,
//           timer: 3000
//         })
//         sessionStorage.setItem('pmr_', JSON.stringify(data.content));
//         location.replace('https://qtradeai.com/dashboard/payment');
//       } else {
//         swal({
//           type: 'error',
//           title: data.error.message,
//           showConfirmButton: false,
//           timer: 3000
//         })
//       }
//     });
//   }

//   preBasic() {
//     swal({
//       title: 'Please Wait..!',
//       text: 'working..',
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//       allowEnterKey: false,
//       onOpen: () => {
//           swal.showLoading()
//       }
//   })
//     this.paypreBasic()
//     .subscribe((data: any = []) => {
//       if (data.error.status === '0') {
//         swal.close();
//         this.toastrService.success(data.success.message);
//         sessionStorage.setItem('pmr_', JSON.stringify(data.content));
//         location.replace('https://qtradeai.com/dashboard/payment');
//       } else {
//         swal({
//           type: 'error',
//           title: data.error.message,
//           showConfirmButton: false,
//           timer: 3000
//         })
//       }
//     });
//   }


  BasicSwal() {
  swal({
              title: 'Order?',
              html: 'Are you sure you want to order BASIC Package(s)?',
              type: 'question',
              showCancelButton: true
            }).then((result) => {
              if (result.value) {
                this.OnBasic()
              }
            });
}

  OnBasic() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.submitBasic()
      .subscribe((data: any = [0]) => {
        console.log(data)
        if (data.error.status === '0') {
          swal.close()
          this.id = data.success.orderID
          this.amount = data.success.amount
          this.toastrService.success('Order Created Successfully', 'Successful', {
            timeOut: 3000, });
            const b = this.balance
            swal({
              title: 'Payment!',
              html: 'Choose your model of Payment.<br> <strong style="font-weight: 30px !important">Wallet: </strong>' + b + '</br>' + '<button id="panel4" type="button" class="btn btn-primary" style="margin-top: 5%; color: white">Transfer / Deposit</button>',
              type: 'question',
              showCancelButton: true,
              confirmButtonText: 'Wallet Payment',
              cancelButtonText: 'Card Payment',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
                const wallet = '1'
                this.payBasic = function() {
                  const body = {
                  'amount': this.amount,
                  'method': wallet,
                  'orderID': this.id,
                  'userID': this.userid,
                  'publicKey': this.publickey,
                  'username': this.username
                }
                return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
              }
              this.Basic2()
              } else if (
                result.dismiss === swal.DismissReason.cancel
              ) {
                const card = '2'
                this.payBasic = function() {
                  const body = {
                  'amount': this.amount,
                  'method': card,
                  'orderID': this.id,
                  'userID': this.userid,
                  'publicKey': this.publickey,
                  'username': this.username
                }
                return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
              }
              this.Basic()
              } else if (result.dismiss === swal.DismissReason.close) {
                const transfer = '3'
                this.payBasic = function() {
                  const body = {
                  'amount': this.amount,
                  'method': transfer,
                  'orderID': this.id,
                  'userID': this.userid,
                  'publicKey': this.publickey,
                  'username': this.username
                }
                return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
              }
              this.Basic3()
              }
            })
            $(document).on('click', '#panel4', function() {
              $('.swal2-close').click()
            });
          }  else if (data.error.status === '1') {
            swal.close()
            swal({
              type: 'error',
              title: data.error.message,
              showConfirmButton: false,
              timer: 3000
            })
          }
      });
  }

  Basic() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.payBasic()
    .subscribe((data: any = []) => {
      console.log(data)
      if (data.error.status === '0') {
        swal.close();
        this.toastrService.success(data.success.message);
        sessionStorage.setItem('pmr_', JSON.stringify(data.content));
        location.replace('https://qtradeai.com/dashboard/payment');
      } else {
        swal({
          type: 'error',
          title: data.error.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  Basic2() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.payBasic()
    .subscribe((data: any = []) => {
      // console.log(data)
      if (data.error.status === '0') {
        swal.close();
        swal({
          type: 'success',
          title: data.success.message,
          showConfirmButton: false,
          timer: 3000
        })
      } else {
        swal({
          type: 'error',
          title: data.error.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  Basic3() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.payBasic()
    .subscribe((res: any = []) => {
      // console.log(data)
      if (res.error.status === '0') {
                    swal.close();
                    this.toastrService.success(res.success.message);
                    swal({
                      type: 'success',
                      html: '<b>Payment ID: </b>' + res.content.paymentID + '</br>' + '<b> Amount: </b>' + res.content.amount + '</br>' +
                      '<b>Account Name: </b>' + res.content.account.accountName + '</br>' +
                      '<b>Bank Name: </b>' + res.content.account.bankName + '</br>' +
                      '<b>Account Number: </b>' + res.content.account.accountNumber,
                      title: 'Make a Transfer or Deposit',
                      showConfirmButton: true,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      allowEnterKey: false,
                      confirmButtonText: '<i class="fa fa-upload"></i> Upload Proof!',
                      confirmButtonAriaLabel: 'Upload Proof!',
                    }).then((result) => {
                      if (result.value) {
                        this.router.navigate(['/log'])
                      }
                    })
      } else {
        swal({
          type: 'error',
          title: res.error.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }


  RegularSwal() {
  swal({
              title: 'Order?',
              html: 'Are you sure you want to order ' + this.coun + ' REGULAR Package(s)?',
              type: 'question',
              showCancelButton: true
            }).then((result) => {
              if (result.value) {
                this.OnRegular()
              }
            });
}

  OnRegular() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.submitRegular()
      .subscribe((data: any = []) => {
        // console.log(data)
        if (data.error.status === '0') {
          swal.close()
          this.id = data.success.orderID
          this.amount = data.success.amount
          this.toastrService.success('Subscription Successful', 'Successful', {
            timeOut: 3000, });
            const b = this.balance
            swal({
              title: 'Payment!',
              html: 'Choose your model of Payment.<br> <strong style="font-weight: 30px !important">Wallet: </strong>' + b + '</br>' + '<button id="panel5" type="button" class="btn btn-primary" style="margin-top: 5%; color: white">Transfer / Deposit</button>',
              type: 'question',
              showCancelButton: true,
              confirmButtonText: 'Wallet Payment',
              cancelButtonText: 'Card Payment',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
                const wallet = '1'
                this.payRegular = function() {
                  const body = {
                  'amount': this.amount,
                  'method': wallet,
                  'orderID': this.id,
                  'userID': this.userid,
                  'publicKey': this.publickey,
                  'username': this.username
                }
                // console.log(body)
                return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
              }
              this.Regular2()
              } else if (result.dismiss === swal.DismissReason.cancel) {
                const card = '2'
                this.payRegular = function() {
                  const body = {
                  'amount': this.amount,
                  'method': card,
                  'orderID': this.id,
                  'userID': this.userid,
                  'publicKey': this.publickey,
                  'username': this.username
                }
                return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
              }
              this.Regular()
              } else if (result.dismiss === swal.DismissReason.close) {
                const transfer = '3'
                this.payRegular = function() {
                  const body = {
                  'amount': this.amount,
                  'method': transfer,
                  'orderID': this.id,
                  'userID': this.userid,
                  'publicKey': this.publickey,
                  'username': this.username
                }
                return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
              }
              this.Regular3()
              }
            })
            $(document).on('click', '#panel5', function() {
              $('.swal2-close').click()
            });
          }  else if (data.error.status === '1') {
            swal.close()
            swal({
              type: 'error',
              title: data.error.message,
              showConfirmButton: false,
              timer: 3000
            })
          }
      });
  }

  Regular() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.payRegular()
    .subscribe((data: any = []) => {
      // console.log(data)
      if (data.error.status === '0') {
        swal.close();
        this.toastrService.success(data.success.message);
        sessionStorage.setItem('pmr_', JSON.stringify(data.content));
        location.replace('https://qtradeai.com/dashboard/payment');
      } else {
        swal({
          type: 'error',
          title: data.error.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  Regular2() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.payRegular()
    .subscribe((data: any = []) => {
      // console.log(data)
      if (data.error.status === '0') {
        swal.close();
        swal({
          type: 'success',
          title: data.success.message,
          showConfirmButton: false,
          timer: 3000
        })
        // sessionStorage.setItem('pmr_', JSON.stringify(data.content));
        // location.replace('https://qtradeai.com/dashboard/payment/');
      } else {
        swal({
          type: 'error',
          title: data.error.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  Regular3() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.payRegular()
    .subscribe((res: any = []) => {
      // console.log(data)
      if (res.error.status === '0') {
                    swal.close();
                    this.toastrService.success(res.success.message);
                    swal({
                      type: 'success',
                      html: '<b>Payment ID: </b>' + res.content.paymentID + '</br>' + '<b> Amount: </b>' + res.content.amount + '</br>' +
                      '<b>Account Name: </b>' + res.content.account.accountName + '</br>' +
                      '<b>Bank Name: </b>' + res.content.account.bankName + '</br>' +
                      '<b>Account Number: </b>' + res.content.account.accountNumber,
                      title: 'Make a Transfer or Deposit',
                      showConfirmButton: true,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      allowEnterKey: false,
                      confirmButtonText: '<i class="fa fa-upload"></i> Upload Proof!',
                      confirmButtonAriaLabel: 'Upload Proof!',
                    }).then((result) => {
                      if (result.value) {
                        this.router.navigate(['/log'])
                      }
                    })
      } else {
        swal({
          type: 'error',
          title: res.error.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }


  PremiumSwal() {
  swal({
              title: 'Order?',
              html: 'Are you sure you want to order ' + this.coun + ' PREMIUM Package(s)?',
              type: 'question',
              showCancelButton: true
            }).then((result) => {
              if (result.value) {
                this.OnPremium()
              }
            });
}

  OnPremium() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.submitPremium()
      .subscribe((data: any = []) => {
        // console.log(data)
        if (data.error.status === '0') {
          swal.close();
          this.id = data.success.orderID
          this.amount = data.success.amount
          this.toastrService.success('Order Created Successfully', 'Successful', {
            timeOut: 3000, });
            const b = this.balance
            swal({
              title: 'Payment!',
              html: 'Choose your model of Payment.<br> <strong style="font-weight: 30px !important">Wallet: </strong>' + b + '</br>' + '<button id="panel6" type="button" class="btn btn-primary" style="margin-top: 5%; color: white">Transfer / Deposit</button>',
              type: 'question',
              showCancelButton: true,
              confirmButtonText: 'Wallet Payment',
              cancelButtonText: 'Card Payment',
              reverseButtons: true
            }).then((result) => {
              if (result.value) {
                const wallet = '1'
                this.payPremium = function() {
                  const body = {
                  'amount': this.aomunt,
                  'method': wallet,
                  'orderID': this.id,
                  'userID': this.userid,
                  'publicKey': this.publickey,
                  'username': this.username
                }
                // console.log(body)
                return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
              }
              this.Premium2()
              } else if (result.dismiss === swal.DismissReason.cancel) {
                const card = '2'
                this.payPremium = function() {
                  const body = {
                  'amount': this.amount,
                  'method': card,
                  'orderID': this.id,
                  'userID': this.userid,
                  'publicKey': this.publickey,
                  'username': this.username
                }
                return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
              }
              this.Premium()
              } else if (result.dismiss === swal.DismissReason.close) {
                const transfer = '3'
                this.payPremium = function() {
                  const body = {
                  'amount': this.amount,
                  'method': transfer,
                  'orderID': this.id,
                  'userID': this.userid,
                  'publicKey': this.publickey,
                  'username': this.username
                }
                return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
              }
              this.Premium3()
              }
            })
            $(document).on('click', '#panel6', function() {
              $('.swal2-close').click()
            });
          }  else if (data.error.status === '1') {
            swal.close()
            swal({
              type: 'error',
              title: data.error.message,
              showConfirmButton: false,
              timer: 3000
            })
          }
      });
  }

  Premium() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.payPremium()
    .subscribe((data: any = []) => {
      // console.log(data)
      if (data.error.status === '0') {
        swal.close();
        this.toastrService.success(data.success.message);
        sessionStorage.setItem('pmr_', JSON.stringify(data.content));
        location.replace('https://qtradeai.com/dashboard/payment');
      } else {
        swal({
          type: 'error',
          title: data.error.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  Premium2() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.payPremium()
    .subscribe((data: any = []) => {
      // console.log(data)
      if (data.error.status === '0') {
        swal.close();
        swal({
          type: 'success',
          title: data.success.message,
          showConfirmButton: false,
          timer: 3000
        })
        sessionStorage.setItem('pmr_', JSON.stringify(data.content));
        location.replace('https://qtradeai.com/dashboard/payment/');
      } else {
        swal({
          type: 'error',
          title: data.error.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }

  Premium3() {
    swal({
      title: 'Please Wait..!',
      text: 'working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          swal.showLoading()
      }
  })
    this.payPremium()
    .subscribe((res: any = []) => {
      // console.log(data)
      if (res.error.status === '0') {
                    swal.close();
                    this.toastrService.success(res.success.message);
                    swal({
                      type: 'success',
                      html: '<b>Payment ID: </b>' + res.content.paymentID + '</br>' + '<b> Amount: </b>' + res.content.amount + '</br>' +
                      '<b>Account Name: </b>' + res.content.account.accountName + '</br>' +
                      '<b>Bank Name: </b>' + res.content.account.bankName + '</br>' +
                      '<b>Account Number: </b>' + res.content.account.accountNumber,
                      title: 'Make a Transfer or Deposit',
                      showConfirmButton: true,
                      allowOutsideClick: false,
                      allowEscapeKey: false,
                      allowEnterKey: false,
                      confirmButtonText: '<i class="fa fa-upload"></i> Upload Proof!',
                      confirmButtonAriaLabel: 'Upload Proof!',
                    }).then((result) => {
                      if (result.value) {
                        this.router.navigate(['/log'])
                      }
                    })
      } else {
        swal({
          type: 'error',
          title: res.error.message,
          showConfirmButton: false,
          timer: 3000
        })
      }
    });
  }


//   ExclusiveSwal() {
//   swal({
//               title: 'Order?',
//               html: 'Are you sure you want to order' + this.coun + 'PREMIUM Package(s)?',
//               type: 'question',
//               showCancelButton: true
//             }).then((result) => {
//               if (result.value) {
//                 this.OnPremium()
//               }
//             });
// }

first() {
  swal({
    title: 'Payment!',
    html: 'Choose your model of Payment.',
    type: 'question',
    showCloseButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showCancelButton: true,
    confirmButtonText: 'BTC Payment',
    cancelButtonText: 'Card Payment',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      const wallet = '1'
      this.paypreBasic = function() {
        const body = {
        'amount': this.amount,
        'method': wallet,
        'orderID': this.id,
        'userID': this.userid,
        'publicKey': this.publickey,
        'username': this.username
      }
      // console.log(body)
      return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
    }
    this.preBasic2()
    } else if (result.dismiss === swal.DismissReason.cancel) {
      alert('card');
      const card = '2'
      this.paypreBasic = function() {
        const body = {
        'amount': this.amount,
        'method': card,
        'orderID': this.id,
        'userID': this.userid,
        'publicKey': this.publickey,
        'username': this.username
      }
      return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
    }
    this.preBasic()
    } else if (result.dismiss === swal.DismissReason.close) {
      const transfer = '3'
      this.paypreBasic = function() {
        const body = {
        'amount': this.amount,
        'method': transfer,
        'orderID': this.id,
        'userID': this.userid,
        'publicKey': this.publickey,
        'username': this.username
      }
      return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
    }
    // this.preBasic3()
    }

  })
}

  OnExclusive() {
    document.location.href = 'tel:+2348035870063';
  }

  /**************General Submit***************** */

  submit(x) {
    swal({
                title: 'Order?',
                html: 'Are you sure you want to order this Package?',
                type: 'question',
                showCancelButton: true
              }).then((result) => {
                if (result.value) {
                  this.yes(x)
                }
              });
  }
  
    yes(x) {
      swal({
        title: 'Please Wait..!',
        text: 'working..',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            swal.showLoading()
        }
    })
      this.pack2(x)
        .subscribe((data: any = [0]) => {
          if (data.error.status === '0') {
            this.id = data.success.orderID
            this.amount = data.success.amount
            this.toastrService.success('Order has been generated Successfully', 'Successful', {
              timeOut: 3000, });
              const b = this.balance
              swal({
                title: 'Payment!',
                html: 'Choose your model of Payment.<br> <strong style="font-weight: 30px !important">Wallet: </strong>' + b + '</br>' + '<button id="panel3" type="button" class="btn btn-primary" style="margin-top: 5%; color: white">Transfer / Deposit</button>',
                type: 'question',
                showCloseButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                showCancelButton: true,
                confirmButtonText: 'Wallet Payment',
                cancelButtonText: 'Card Payment',
                reverseButtons: true
              }).then((result) => {
                if (result.value) {
                  const wallet = '1'
                  this.paypreBasic = function() {
                    const body = {
                    'amount': this.amount,
                    'method': wallet,
                    'orderID': this.id,
                    'userID': this.userid,
                    'publicKey': this.publickey,
                    'username': this.username
                  }
                  // console.log(body)
                  return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
                }
                this.preBasic2()
                } else if (result.dismiss === swal.DismissReason.cancel) {
                  const card = '2'
                  this.paypreBasic = function() {
                    const body = {
                    'amount': this.amount,
                    'method': card,
                    'orderID': this.id,
                    'userID': this.userid,
                    'publicKey': this.publickey,
                    'username': this.username
                  }
                  return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
                }
                this.preBasic()
                } else if (result.dismiss === swal.DismissReason.close) {
                  const transfer = '3'
                  this.paypreBasic = function() {
                    const body = {
                    'amount': this.amount,
                    'method': transfer,
                    'orderID': this.id,
                    'userID': this.userid,
                    'publicKey': this.publickey,
                    'username': this.username
                  }
                  return this.http.post(this.rootUrl + '/customer/create/payment', {'data': body});
                }
                this.preBasic7()
                }
  
              })
              $(document).on('click', '#panel3', function() {
                $('.swal2-close').click()
              });
            }  else if (data.error.status === '1') {
              swal.close()
              swal({
                type: 'error',
                title: data.error.message,
                showConfirmButton: false,
                timer: 3000
              })
            }
        });
    }
  
    preBasic7() {
      swal({
        title: 'Please Wait..!',
        text: 'working..',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            swal.showLoading()
        }
    })
      this.paypreBasic()
      .subscribe((res: any = []) => {
        // console.log(data)
        if (res.error.status === '0') {
                      swal.close();
                      this.toastrService.success(res.success.message);
                      swal({
                        type: 'success',
                        html: '<b>Payment ID: </b>' + res.content.paymentID + '</br>' + '<b> Amount: </b>' + res.content.amount + '</br>' +
                        '<b>Account Name: </b>' + res.content.account.accountName + '</br>' +
                        '<b>Bank Name: </b>' + res.content.account.bankName + '</br>' +
                        '<b>Account Number: </b>' + res.content.account.accountNumber,
                        title: 'Make a Transfer or Deposit',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        confirmButtonText: '<i class="fa fa-upload"></i> Upload Proof!',
                        confirmButtonAriaLabel: 'Upload Proof!',
                      }).then((result) => {
                        if (result.value) {
                          this.router.navigate(['/log'])
                        }
                      })
        } else {
          swal({
            type: 'error',
            title: res.error.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
    }
  
    preBasic2() {
      swal({
        title: 'Please Wait..!',
        text: 'working..',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            swal.showLoading()
        }
    })
      this.paypreBasic()
      .subscribe((data: any = []) => {
        // console.log(data)
        if (data.error.status === '0') {
          swal.close();
          swal({
            type: 'success',
            title: data.success.message,
            showConfirmButton: false,
            timer: 3000
          })
          sessionStorage.setItem('pmr_', JSON.stringify(data.content));
          location.replace('https://qtradeai.com/dashboard/payment');
        } else {
          swal({
            type: 'error',
            title: data.error.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
    }
  
    preBasic() {
      swal({
        title: 'Please Wait..!',
        text: 'working..',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            swal.showLoading()
        }
    })
      this.paypreBasic()
      .subscribe((data: any = []) => {
        // console.log(data)
        if (data.error.status === '0') {
          swal.close();
          this.toastrService.success(data.success.message);
          sessionStorage.setItem('pmr_', JSON.stringify(data.content));
          location.replace('https://qtradeai.com/dashboard/payment');
        } else {
          swal({
            type: 'error',
            title: data.error.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
      });
    }

}
