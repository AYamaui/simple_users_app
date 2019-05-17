import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule, By} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserListComponent} from "../user-list/user-list.component";
import {SearchService} from "../../../../../../Cloudera/github-search/src/app/services/search/search.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {UserComponent} from "../user/user.component";
import {User} from "../../models/user";

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailComponent, UserListComponent, UserComponent ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        NgxPaginationModule,
        HttpClientModule
      ],
      providers: [ SearchService, HttpTestingController, HttpClient ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user information properly', () => {
    component.user = new User(
      'avatarImage',
      'firstName',
      'lastName',
      1,
      'email'
    );

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('h2')).nativeElement.innerText).toEqual('firstName lastName');
    expect(fixture.debugElement.query(By.css('img')).nativeElement.getAttribute('src')).toEqual('avatarImage');
    expect(fixture.debugElement.query(By.css('.email')).nativeElement.innerText).toEqual('Email: email');
    expect(fixture.debugElement.query(By.css('.id')).nativeElement.innerText).toEqual('Id: 1');
    expect(fixture.debugElement.query(By.css('button')).nativeElement).toBeDefined();
  });
});
