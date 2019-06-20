import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Http, Headers, RequestOptions} from '@angular/http';


@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.component.html',
  styleUrls: ['./newsdetail.component.css']
})
export class NewsdetailComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  userid = this.SessionSt.retrieve('userid');
  news: any;
  leader: any;
  read: any;

  constructor(private router: Router,
              private SessionSt: SessionStorageService,
              private httpService: HttpClient) { }

  ngOnInit() {
    if (this.userid === null) {
    this.router.navigate(['/login']);
  }


  this.httpService.get(this.rootUrl + '/customer/get/news/0000000000000/99999999999999999999', {
    headers: new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('username', this.SessionSt.retrieve('username'))
    .set('publicKey', this.SessionSt.retrieve('publicKey'))
    .set('userID', this.SessionSt.retrieve('userid'))
  })
    .subscribe((data: any = []) => {
      this.news = data.content.data
      // console.log(this.news)
    });


    this.read = function(selectedItem: any) {
      let c = JSON.stringify(selectedItem)
      localStorage.setItem('c', c);
      this.router.navigate(['/newscontent']);
    }

  }


}
