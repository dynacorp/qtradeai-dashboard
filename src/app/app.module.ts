import { AuthService } from './shared/auth.service';
import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular5-toaster';
import { ToastrModule } from 'ngx-toastr';
import {Ng2Webstorage} from 'ngx-webstorage';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { DataTablesModule } from 'angular-datatables';



import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './shared/right-sidebar/rightsidebar.component';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ReferralsComponent } from './referrals/referrals.component';
import { NewsdetailComponent } from './newsdetail/newsdetail.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { LogComponent } from './log/log.component';
import { FilterPipe } from './filter.pipe';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { NewscontentComponent } from './newscontent/newscontent.component';

const routes: Routes = [
  {path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    },
    {path: 'dashboard',
  data: {
      title: 'Dashboard',
      urls: [{title: 'My Dashboard', url: '/'}]
    },
    component: DashboardComponent},
  {path: 'profile',
  data: {
      title: 'Profile',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'Profile'}]
    },
    component: ProfileComponent
  },
  {path: 'log',
  data: {
      title: 'Logs',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'Logs'}]
    },
    component: LogComponent
  },
  {path: 'account',
  data: {
      title: 'Account settings',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'My Account/Withdrawals'}]
    },
    component: AccountComponent
  },
  {path: 'subscription',
  data: {
      title: 'Subcription',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'Subscription'}]
    },
    component: SubscriptionComponent
  },
  {path: 'log',
  data: {
      title: 'Logs',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'logs'}]
    },
    component: LogComponent
  },
  {path: 'calendar',
  data: {
      title: 'calendar',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'calendar'}]
    },
    component: CalendarComponent
  },
  {path: 'referrals',
  data: {
      title: 'Referrals',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'referrals'}]
    },
    component: ReferralsComponent
  },
  {path: 'scoreboard',
  data: {
      title: 'Scoreboard',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'Scoreboard'}]
    },
    component: ScoreboardComponent
  },
  {path: 'newsdetail',
  data: {
      title: 'News & Promotions',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'News & Promotions'}]
    },
    component: NewsdetailComponent
  },
  {path: 'newscontent',
  data: {
      title: 'News Content',
      urls: [{title: 'Dashboard', url: '/'}, {title: 'Me'}, {title: 'News Content'}]
    },
    component: NewscontentComponent
  },
  {path: 'login',
  data: {
      title: 'Login',
    },
    component: LoginComponent,
  },
  {path: 'register',
  data: {
      title: 'Register',
    },
    component: RegisterComponent,
  },
  {path: 'forgotpassword',
  data: {
      title: 'Forgot Password',
    },
    component: ForgotpassComponent,
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    RightSidebarComponent,
    TestComponent,
    LoginComponent,
    SubscriptionComponent,
    DashboardComponent,
    ProfileComponent,
    ReferralsComponent,
    CalendarComponent,
    NewsdetailComponent,
    RegisterComponent,
    ForgotpassComponent,
    AccountComponent,
    LogComponent,
    FilterPipe,
    ScoreboardComponent,
    NewscontentComponent,
  ],
  schemas: [
NO_ERRORS_SCHEMA
],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(
      routes, { useHash: true }
    ),
    HttpClientModule,
    ToastrModule.forRoot(),
    Ng2Webstorage,
    BrowserAnimationsModule,
    NgIdleKeepaliveModule.forRoot(),
    SweetAlert2Module.forRoot({
            buttonsStyling: false,
            customClass: 'modal-content',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn'
        })
  ],
  exports: [
    DataTablesModule
  ],
  providers: [
    UserService,
    AuthService,
    ToasterModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
