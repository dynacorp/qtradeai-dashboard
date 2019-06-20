import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import 'assets/js/footable-init.js';
import swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  userid = this.SessionSt.retrieve('userid');
  orders: any;
  cancelOrder: any;
  ordersL: any;
  totalSubscription: any;
  totalWithdrawal: any;
  withdraw: any;
  withdrawL: any;
  transfers: any;
  transfersL: any;
  Id: any;
  payments: any;
  paymentsL: any;
  swal: any;
  cancelPayment: any;
  upload: any;
  readThis: any;
  changeListener: any;
  uploadproof: any;

  constructor(
  private SessionSt: SessionStorageService,
  private httpService: HttpClient,
  private el: ElementRef,
  private toastrService: ToastrService,
  private http: HttpClient) { }

  ngOnInit() {
    this.loadScripts();

    this.httpService.get(this.rootUrl + '/customer/get/orders/0/9898989898989898', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.orders = data.content.data;
      this.ordersL = data.content.data.length;
    });

    this.httpService.get(this.rootUrl + '/customer/get/withdrawal/0/9898989898989898', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.withdraw = data.content.data;
      this.withdrawL = data.content.data.length;
    });

    this.httpService.get(this.rootUrl + '/customer/get/transfers/0/9898989898989898', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.transfers = data.content.data;
      this.transfersL = data.content.data.length;
    });

    this.httpService.get(this.rootUrl + '/customer/get/payments/0/9898989898989898', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.payments = data.content.data;
      this.paymentsL = data.content.data.length;
    });

    this.httpService.get(this.rootUrl + '/customer/get/earning/log', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      console.log(data)
    });

    this.httpService.get(this.rootUrl + '/customer/get/self', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.totalWithdrawal = data.content.data[0].totalWithdrawal;
      this.totalSubscription = data.content.data[0].totalSubscription;
      this.Id = data.content.data[0].userID;
    });

    this.cancelOrder = function(order) {
      const body = {
      'status': '-1',
      'orderID': order.orderID,
      'userID': this.SessionSt.retrieve('userid'),
      'publicKey': this.SessionSt.retrieve('publicKey'),
      'username': this.SessionSt.retrieve('username')
    }
      // console.log(body)
    return this.http.put(this.rootUrl + '/customer/update/order', {'data': body});
  }

  this.upload = function() {
    $('#input-file-id').click();
  }

  this.cancelPayment = function(payment) {
    const body = {
    'status': '-1',
    'orderID': payment.orderID,
    'paymentID': payment._id,
    'userID': this.SessionSt.retrieve('userid'),
    'publicKey': this.SessionSt.retrieve('publicKey'),
    'username': this.SessionSt.retrieve('username')
  }
  // console.log(body)
return this.http.put(this.rootUrl + '/customer/verify/payment', {'data': body});
}

this.changeListener = function($event, payment): void {
  this.readThis($event.target);

swal({
title: 'Are you sure?',
text: 'You are about to upload proof of Payment!',
type: 'warning',
showCancelButton: true,
confirmButtonText: 'Yes, upload it!',
cancelButtonText: 'No, cancel!',
reverseButtons: true
}).then((result) => {
if (result.value) {
this.Pic(payment);
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

this.uploadproof = function(payment){
  const body = {
    pop: this.image,
    orderID: payment.orderID,
    paymentID: payment._id,
    status: '1',
    username: this.SessionSt.retrieve('username'),
    userID: this.SessionSt.retrieve('userid'),
    publicKey: this.SessionSt.retrieve('publicKey')
  }
  // console.log(body);
  return this.http.put(this.rootUrl + '/customer/verify/payment', {'data': body});
}


  }

  Pic(payment) {
    this.uploadproof(payment).subscribe((data: any = []) => {
          if (data.error.status === '0') {
            swal(
                  'Uploaded!',
                  'Your Proof has been Updated. Sit Back and wait for confirmation.',
                  'success'
                )
              location.reload();
          }else {
            this.toastrService.error('Sorry! An error occured!');
          }
        });
    }
      setClass(order, t) {
      let Objclass = '';
      let labelText = ''
      if (order.status === '0') {
        Objclass = 'label label-warning';
        labelText = 'Awaiting Payment';
      }else if (order.status === '-1') {
        Objclass = 'label label-danger';
        labelText = 'Cancelled';
      }else if(order.status === '1') {
        Objclass = 'label label-primary';
        labelText = 'Payed';
      }else if(order.status === '2') {
        Objclass = 'label label-inverse';
        labelText = 'Shipped';
      }else if(order.status === '3') {
        Objclass = 'label label-custom';
        labelText = 'Delievered';
      }else if(order.status === '10') {
        Objclass = 'label label-success';
        labelText = 'Delievered';
      }
      return t === 'c' ? Objclass : labelText;
    }

    setClassw(withdraw, t) {
      let Objclass = '';
      let labelText = ''
      if (withdraw.status === '0') {
        Objclass = 'label label-warning';
        labelText = 'Pending';
      }else if (withdraw.status === '-1') {
        Objclass = 'label label-danger';
        labelText = 'Failed';
      }else if(withdraw.status === '1') {
        Objclass = 'label label-success';
        labelText = 'Payed';
      }else if(withdraw.status === '2') {
        Objclass = 'label label-inverse';
        labelText = 'Confirmed';
      }
      return t === 'c' ? Objclass : labelText;
    }

    setClasst(transfer, t) {
      let Objclass = '';
      let labelText = ''
      if (transfer.status === '-1') {
        Objclass = 'label label-danger';
        labelText = 'Failed';
      }else if(transfer.status === '1') {
        Objclass = 'label label-primary';
        labelText = 'Success';
      }
      return t === 'c' ? Objclass : labelText;
    }

    setClassty(transfer, t) {
      let Objclass = '';
      let labelText = ''
      if (transfer.fromAccount === this.Id) {
        Objclass = 'label label-success';
        labelText = 'sent';
      }else {
        Objclass = 'label label-inverse';
        labelText = 'recieved';
      }
      return t === 'c' ? Objclass : labelText;
    }

    setClasspm(payment, t) {
      let Objclass = '';
      let labelText = ''
      if (payment.method === '1') {
        Objclass = 'label label-danger';
        labelText = 'Wallet';
      }else if(payment.method === '2') {
        Objclass = 'label label-primary';
        labelText = 'Card';
      }else if(payment.method === '3') {
        Objclass = 'label label-primary';
        labelText = 'Transfer/Deposit';
      }
      return t === 'c' ? Objclass : labelText;
    }

    setClassps(payment, t) {
      let Objclass = '';
      let labelText = ''
      if (payment.status === '-1') {
        Objclass = 'label label-danger';
        labelText = 'Failed';
      }else if(payment.status === '0') {
        Objclass = 'label label-warning';
        labelText = 'Pending';
      }else if(payment.status === '1') {
        Objclass = 'label label-success';
        labelText = 'Successful';
      }
      return t === 'c' ? Objclass : labelText;
    }

    delOrder(order) {
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
    this.cancelOrder(order)
      .subscribe((data: any = []) => {
        // console.log(data)
        if (data.error.status === '0') {
          swal.close();
          this.toastrService.success('Order Deleted Successful', 'Successful', {
            timeOut: 3000, });
            location.reload();
        }else {
          swal.close();
          this.toastrService.error('There was an error with your request!');
        }
      });
  }

  delPayment(payment) {
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
  this.cancelPayment(payment)
    .subscribe((data: any = []) => {
      // console.log(data)
      if (data.error.status === '0') {
        swal.close();
        this.toastrService.success('Payment Deleted Successful', 'Successful', {
          timeOut: 3000, });
          location.reload();
      }else {
        swal.close();
        this.toastrService.error('There was an error with your request!');
      }
    });
}

  loadScripts() {
    const dynamicScripts = [
     '../assets/js/footable-init.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

}
