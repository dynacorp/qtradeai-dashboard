import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage/dist/app';
import { Component } from '@angular/core';

@Component({
  selector: 'ma-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  profileimage = this.SessionSt.retrieve('profileimage');
  fullname = this.SessionSt.retrieve('fullname');
  email = this.SessionSt.retrieve('email');

  constructor(private SessionSt: SessionStorageService, private router: Router) {

  }

  onLogout() {
    this.SessionSt.clear();
    this.router.navigateByUrl('/login');
  }

  onProfile() {
    this.router.navigateByUrl('/profile');
  }
  onAccount() {
    this.router.navigateByUrl('/account');
  }

  onReferrals() {
    this.router.navigateByUrl('/referrals');
  }

}
