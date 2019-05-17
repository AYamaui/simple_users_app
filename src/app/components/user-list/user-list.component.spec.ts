import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {UserComponent} from "../user/user.component";
import {UserDetailComponent} from "../user-detail/user-detail.component";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserModule, By} from "@angular/platform-browser";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {of} from "rxjs";
import {User} from "../../models/user";
import {DataServiceService} from "../../services/data/data-service.service";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {

    const dataServiceStub = {
      getUsers: () => of([
          [
            new User(
            'avatarImage',
            'firstName',
            'lastName',
            1,
            'email'
            )
          ], 1]
      )
    };

    TestBed.configureTestingModule({
      declarations: [ UserListComponent, UserComponent, UserDetailComponent ],
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
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should receive the information of the users from DataService', () => {
    spyOn(component, 'getUsers');
    component.ngOnInit();

    expect(component.getUsers).toHaveBeenCalled();

    expect(component.totalPages).toEqual(1);
    expect(component.pages).toEqual([1]);

    fixture.whenStable().then(() => {
      expect(component.users).toEqual(
        [
          new User(
          'avatarImage',
          'firstName',
          'lastName',
          1,
          'email'
          )
        ]
      );
    });
  });

  it('should call getUsers when page is clicked', () => {
    spyOn(component, 'getUsers');
    fixture.debugElement.query(By.css('.direct-page-link')).triggerEventHandler('click', {page: 1});
    expect(component.getUsers).toHaveBeenCalled();
    expect(component.getUsers).toHaveBeenCalledWith(1);
  });

  it('should call getUsers when Next link is clicked', () => {
    spyOn(component, 'getUsers');
    fixture.debugElement.query(By.css('.next-link')).triggerEventHandler('click', null);
    expect(component.getUsers).toHaveBeenCalled();
  });

});
