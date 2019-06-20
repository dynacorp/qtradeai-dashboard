import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Router, NavigationEnd, Event } from '@angular/router';


@Component({
  selector: 'app-newscontent',
  templateUrl: './newscontent.component.html',
  styleUrls: ['./newscontent.component.css']
})
export class NewscontentComponent implements OnInit {
  content = JSON.parse(localStorage.getItem('c'));
  userid = this.SessionSt.retrieve('userid');
  hello: any;

  constructor(
    private SessionSt: SessionStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.userid === null) {
      this.router.navigate(['/login']);
    }

    if (this.content === null) {
      this.router.navigate(['/newsdetail']);
    }

    this.hello = this.content[0]
    // console.log(this.hello)

//     this.router.events.subscribe( (event: Event) => {
//     if (event instanceof NavigationEnd) {
//         console.log(event.url);
//         localStorage.removeItem('c');
//     }
// })
  }

}
