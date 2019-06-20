import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Http, Headers, RequestOptions} from '@angular/http';
import swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  readonly picUrl = 'https://apis.qtradeai.com/public/';
  profileimage = this.SessionSt.retrieve('profileimage');
  userid = this.SessionSt.retrieve('userid');
  fullname = this.SessionSt.retrieve('fullname');
  occupation = this.SessionSt.retrieve('occupation');
  datejoined = this.SessionSt.retrieve('datejoined');
  email = this.SessionSt.retrieve('email');
  phonen = this.SessionSt.retrieve('phone');
  dot = '...';
  ref1: any;
  ref2: any;
  ref3: any;
  ref4: any;
  ref5: any;
  ref1l: any;
  ref2l: any;
  ref3l: any;
  ref4l: any;
  ref5l: any;
  self: any;
  totalWithdrawal: any;
  BMToken: any;
  totalSubscription: any;
  balance: any;
  leader: any;
  news: any;
  newstitle: any;
  newsdate: any;
  newscreator: any;
  newscontent: any;
  trial: any;
  broks: any;
  perc: any;
  perc2: any;
  broker: any;

  constructor(private renderer: Renderer2, private el: ElementRef,
  private SessionSt: SessionStorageService, private router: Router,
  private httpService: HttpClient,
  private http: HttpClient) { }

  ngOnInit() {
  if (this.userid === null) {
    this.router.navigate(['/login']);
    window.location.reload();
  }


//   swal({
//     padding: 153.1,
//     imageClass: 'contact-form-image',
//     customClass: 'contact-form-image',
//     background: '#fff url(assets/images/post.jpeg)',
//     showConfirmButton: false
// })

  const headers = new Headers();

  this.httpService.get(this.rootUrl + '/customer/get/self', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.totalWithdrawal = data.content.data[0].totalWithdrawal;
      this.totalSubscription = data.content.data[0].totalSubscription;
      this.BMToken = data.content.data[0].BMToken;


      if (data.content.data[0].trialActivation === '0'){
        this.trial = 'Not yet Activated';
      }else if (data.content.data[0].trialActivation < '0') {
        this.trial = 'Trial Exaushted';
      }else if (data.content.data[0].trialActivation > '0') {
        this.trial = 'Days Left: ' + data.content.data[0].daysLeft ;
      }
    });

    this.httpService.get(this.rootUrl + '/customer/get/referrals', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.ref1 = data.content.data.levelOne;
      this.ref2 = data.content.data.levelTwo;
      this.ref3 = data.content.data.levelThree;
      this.ref4 = data.content.data.levelFour;
      this.ref5 = data.content.data.levelFive;
      this.ref1l = this.ref1.length;
      this.ref2l = this.ref2.length;
      this.ref3l = this.ref3.length;
      this.ref4l = this.ref4.length;
      this.ref5l = this.ref5.length;
    });

    this.httpService.get(this.rootUrl + '/customer/get/broker', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    })
    .subscribe((data: any = []) => {
      // console.log(data)
      if (data.error.status === '0'){
        this.broks = data.content.data;
      }else{}
    });

    this.httpService.get(this.rootUrl + '/customer/get/news/0000000000000/99999999999999999999', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      // console.log(data.content.data.length)
      if(data.error.status === '0') {
        if (data.content.data.length === 0) {
          this.news = 'No recent news yet.'
          $('#one').attr({'style':'display: none'})
        } else {
          $('#zero').attr({'style': 'display: none'})
          this.newstitle = data.content.data[0].title
          this.newsdate = data.content.data[0].dateCreated
          this.newscreator = data.content.data[0].creator
          this.newscontent = data.content.data[0].details
        }
      } else {}
      // console.log(data.content.data.length)
    });

    this.httpService.get(this.rootUrl + '/customer/get/balance', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.balance = data.content.data[0].totalDue;
      let a = data.content.userRefs;
      let m = data.content.amMade;

      this.perc = Math.round(a * 100 / 15);
      $('#bar').css('width', this.perc + '%');
      if (this.perc > '100') {
        this.perc2 = '100';
      }else {
        this.perc2 = this.perc;
      }

    });

    this.broker = function(x){
      swal({
        title: 'Disclaimer',
        html: '<ul><li>By making use of the Services, you acknowledge that you know and fully understand that the contents of this Site are for informational purposes only. The Content is not intended to be a substitute for professional financial advice.</li><li>Your ultimate decision in respect of any financial transaction or dealing with any broker is yours and not that of QTradeAI and you represent that you assume all risks and liabilities that may arise therefrom.</li></ul><br>QTradeAI will have no responsibility or liability for, such risks.  You represent and warrant that you have: (a) the necessary technical and financial expertise and ability to engage in the transaction; and (b) the knowledge, experience, understanding, professional advice and information to make your own evaluation of the merits and risks of any transaction.',
        allowOutsideClick: false,
        showCancelButton: true
      }).then((isConfirm) => {
        // console.log(x);
        if (isConfirm.value) {
          // console.log(x);
          window.open(x.link, '_blank');
        } else {}
      })
    }
  }

  gotoScoreboard() {
    this.router.navigate(['/scoreboard']);
  }

  onProfile() {
    this.router.navigateByUrl('/profile');
  }

  onReferral() {
    this.router.navigateByUrl('/referrals');
  }

  onNews() {
    this.router.navigateByUrl('/newsdetail');
  }

}
