import { TestBed, async } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';


import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule,routing  }     from './app-routing.module'
import { LoginComponent } from './login/login.component';
import { DashboardComponent,PersonSearchPipe } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreatecampaignComponent } from './createcampaign/createcampaign.component';
import { HttpClientModule,HTTP_INTERCEPTORS }    from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        routing,
        NgxPaginationModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        NgbModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        HeaderComponent,
        FooterComponent,
        CreatecampaignComponent,
        SignupComponent,
        PersonSearchPipe,
        AdminComponent
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    //   schemas: [
    //     NO_ERRORS_SCHEMA
    // ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'outreach-fundraiser'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('outreach-fundraiser');
  });
});
