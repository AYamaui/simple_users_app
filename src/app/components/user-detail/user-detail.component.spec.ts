import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule, By} from "@angular/platform-browser";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {UserListComponent} from "../user-list/user-list.component";
import {UserComponent} from "../user/user.component";
import {User} from "../../models/user";
import {of} from "rxjs";
import {DataServiceService} from "../../services/data/data-service.service";

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async(() => {
    const dataServiceStub = {
      getUser: () => of(
        new User(
        'avatarImage',
        'firstName',
        'lastName',
        1,
        'email'
        )
      )
    };

    TestBed.configureTestingModule({
      declarations: [ UserDetailComponent, UserListComponent, UserComponent ],
      imports: [
        RouterTestingModule,
        BrowserModule,
        NgxPaginationModule,
        HttpClientModule
      ],
      providers: [
        { provide: DataServiceService, useValue: dataServiceStub }
      ]
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

  it('should receive the information of a single user from DataService', () => {
    spyOn(component, 'getUser');
    component.ngOnInit();

    expect(component.getUser).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      expect(component.user).toEqual(
        new User(
        'avatarImage',
        'firstName',
        'lastName',
        1,
        'email'
        )
      );
    });
  });
});
