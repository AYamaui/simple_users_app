import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {UserDetailComponent} from "../user-detail/user-detail.component";
import {UserListComponent} from "../user-list/user-list.component";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule, By} from "@angular/platform-browser";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {SearchService} from "../../../../../../Cloudera/github-search/src/app/services/search/search.service";
import {HttpTestingController} from "@angular/common/http/testing";
import {Issue} from "../../../../../../Cloudera/github-search/src/app/models/issue/issue";

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent, UserDetailComponent, UserListComponent ],
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
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the user information properly', () => {
    component.firstName = 'firstName';
    component.lastName = 'lastName';
    component.avatarImage = 'avatarImage';
    component.id = 1;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.navbar h3')).nativeElement.innerText).toEqual('firstName lastName');
    expect(fixture.debugElement.query(By.css('img')).nativeElement.getAttribute('src')).toEqual('avatarImage');
  });
});
