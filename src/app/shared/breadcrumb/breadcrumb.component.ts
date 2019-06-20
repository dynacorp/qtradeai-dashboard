import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  userid = this.SessionSt.retrieve('userid');
    readonly rootUrl = 'https://apis.qtradeai.com/public/api';
    BMToken: any;
    balance: any;
    node: any;



	@Input() layout;
    pageInfo;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private SessionSt: SessionStorageService,
        private httpService: HttpClient
    ) {}
    ngOnInit(): void {
        if (this.userid !== null) {
            this.httpService.get(this.rootUrl + '/customer/get/self', {
              headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('username', this.SessionSt.retrieve('username'))
              .set('publicKey', this.SessionSt.retrieve('publicKey'))
              .set('userID', this.SessionSt.retrieve('userid'))
            }).subscribe((data: any = []) => {
              this.BMToken = data.content.data[0].BMToken;
              this.node = data.content.data[0].masternode;
            });

            this.httpService.get(this.rootUrl + '/customer/get/balance', {
              headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('username', this.SessionSt.retrieve('username'))
              .set('publicKey', this.SessionSt.retrieve('publicKey'))
              .set('userID', this.SessionSt.retrieve('userid'))
            }).subscribe((data: any = []) => {
              this.balance = data.content.data[0].totalDue;
            });
        }
        this
        .router.events
        .filter(event => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map(route => {
            while (route.firstChild) route = route.firstChild;
            return route;
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .subscribe((event) => {
            this.titleService.setTitle(event['title']);
            this.pageInfo = event;
        });

    }

    dash() {
        this.router.navigateByUrl('/dashboard');
    }
}
