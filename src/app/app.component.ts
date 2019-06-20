import { Router } from '@angular/router';
import { Component, Renderer2, ElementRef} from '@angular/core';
import {LocationStrategy} from '@angular/common';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { ActivatedRoute } from '@angular/router';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly rootUrl = 'https://qtradeai.sisibox.com/s/public/api';
  userid = this.SessionSt.retrieve('userid');
  // profileimage = this.SessionSt.retrieve('profileimage');
  title = 'Qytrade AI';

  constructor(private SessionSt: SessionStorageService, private url: LocationStrategy,
  private renderer: Renderer2, private el: ElementRef, private router: Router,
  private idle: Idle) {
    if (this.userid === null) {
    this.router.navigate(['/login']);
  }else {

        idle.setIdle(600);
        idle.setTimeout(60);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onTimeoutWarning.subscribe((countdown: number) => {
          // console.log('TimeoutWarning: ' + countdown);
        });

        idle.onTimeout.subscribe(() => {
          // console.log('Timeout');
          SessionSt.clear();
          localStorage.clear();
          this.router.navigate(['/login']);
        });
        idle.watch();
  }
}

  isLoginPage(): boolean {
        if (this.url.path() === '/login') {
          $('#breadcrumb').remove();
          $('#navigation').remove();
          $('#sidebar').remove();
          $('#footer').remove();
          $('#wrap').removeClass('page-wrapper');
          $('#wrap2').removeClass('container-fluid');
          return true;
        }

    if (this.url.path() === '/register') {
      $('#breadcrumb').remove();
      $('#navigation').remove();
      $('#sidebar').remove();
      $('#footer').remove();
      $('#wrap').removeClass('page-wrapper');
      $('#wrap2').removeClass('container-fluid');
      return true;
    }

    if (this.url.path() === '/forgotpassword') {
          $('#breadcrumb').remove();
          $('#navigation').remove();
          $('#sidebar').remove();
          $('#footer').remove();
          $('#wrap').removeClass('page-wrapper');
          $('#wrap2').removeClass('container-fluid');
          return true;
        }

        if (this.url.path() === '/reset') {
          $('#breadcrumb').remove();
          $('#navigation').remove();
          $('#sidebar').remove();
          $('#footer').remove();
          $('#wrap').removeClass('page-wrapper');
          $('#wrap2').removeClass('container-fluid');
          return true;
        }

    if (this.url.path() === '/dashboard') {
          $('#wrap').addClass('page-wrapper');
          $('#wrap2').addClass('container-fluid');
            return true;
        }
    return true;
}
}
