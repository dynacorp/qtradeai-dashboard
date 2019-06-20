import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Component } from '@angular/core';

@Component({
  selector: 'ma-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  profileimage = this.SessionSt.retrieve('profileimage');
  fullname = this.SessionSt.retrieve('fullname');

  constructor(private SessionSt: SessionStorageService, private router: Router) {}

  onLogout() {
    this.SessionSt.clear();
    this.router.navigateByUrl('/login');
  }

  onProfile() {
    this.router.navigateByUrl('/profile');
  }
  onReferrals() {
    this.router.navigateByUrl('/referrals');
  }

  onAccount() {
    this.router.navigateByUrl('/account');
  }


}
