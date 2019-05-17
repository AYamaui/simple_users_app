import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {UserDetailComponent} from "../user-detail/user-detail.component";
import {UserListComponent} from "../user-list/user-list.component";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule, By} from "@angular/platform-browser";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";

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
      ]
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
    expect(fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href')).toEqual('/users/1');
  });
  
});
