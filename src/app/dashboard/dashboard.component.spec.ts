import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { BehaviorSubject, Observable,of } from 'rxjs';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule,routing  }     from '../app-routing.module'
import { LoginComponent } from '../login/login.component';
import { DashboardComponent,PersonSearchPipe } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CreatecampaignComponent } from '../createcampaign/createcampaign.component';
import { HttpClientModule,HTTP_INTERCEPTORS }    from '@angular/common/http';
import { SignupComponent } from '../signup/signup.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { JwtInterceptor } from '../helpers/jwt.interceptor';
import { ErrorInterceptor } from '../helpers/error.interceptor';
import { AdminComponent } from '../admin/admin.component';
import { AuthenticationService } from '../services/authentication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let data = [];
  //let service: AppService;
  let currentUser = {
    'role':'Creator'
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      imports: [
        RouterTestingModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        routing,
        NgxPaginationModule,
        NgbModule
      ],
      declarations: [
        LoginComponent,
        DashboardComponent,
        HeaderComponent,
        FooterComponent,
        CreatecampaignComponent,
        SignupComponent,
        PersonSearchPipe,
        AdminComponent
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
