import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Component, OnInit } from '@angular/core';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  readonly picUrl = 'https://apis.qtradeai.com/public/';
  userid = this.SessionSt.retrieve('userid');
  ref1: any;
  ref2: any;
  ref3: any;
  ref4: any;
  ref5: any;
  fullname: any;
  active1: any;
  active2: any;
  active3: any;
  active4: any;
  active5: any;

  constructor(private SessionSt: SessionStorageService, private router: Router,
  private http: HttpClient,
  private httpService: HttpClient) { }

  ngOnInit() {
    if (this.userid === null) {
    this.router.navigate(['/']);
    location.reload();
  }

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
      // console.log(data)
    });

    this.httpService.get(this.rootUrl + '/customer/get/active/referrals/count', {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('username', this.SessionSt.retrieve('username'))
      .set('publicKey', this.SessionSt.retrieve('publicKey'))
      .set('userID', this.SessionSt.retrieve('userid'))
    }).subscribe((data: any = []) => {
      this.active1 = data.content.data.levelOne[0].totalActive;
      this.active2 = data.content.data.levelTwo[0].totalActive;
      this.active3 = data.content.data.levelThree[0].totalActive;
      this.active4 = data.content.data.levelFour[0].totalActive;
      this.active5 = data.content.data.levelFive[0].totalActive;
      console.log(data)
    });


  }

}
