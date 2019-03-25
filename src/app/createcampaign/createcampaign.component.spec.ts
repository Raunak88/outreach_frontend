import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { APP_BASE_HREF } from '@angular/common';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('CreatecampaignComponent', () => {
  let component: CreatecampaignComponent;
  let fixture: ComponentFixture<CreatecampaignComponent>;


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
        NgbModule,
        HttpClientTestingModule
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
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    //   schemas: [
    //     NO_ERRORS_SCHEMA
    // ]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
