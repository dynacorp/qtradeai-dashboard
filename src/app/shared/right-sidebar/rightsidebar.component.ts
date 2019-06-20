import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'ma-rightsidebar',
  templateUrl: './rightsidebar.component.html'
})
export class RightSidebarComponent {
	fullname = this.SessionSt.retrieve('fullname');
	constructor(private SessionSt: SessionStorageService) {}

}
