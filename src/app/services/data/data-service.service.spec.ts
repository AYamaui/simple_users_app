import {async, TestBed} from '@angular/core/testing';

import { DataServiceService } from './data-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../../models/user";

describe('DataServiceService', () => {

  let httpTestingController: HttpTestingController;
  let service: DataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ DataServiceService ],
      imports: [
        HttpClientTestingModule
      ]
  });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DataServiceService);
  });

  it('should be created', () => {
    const service: DataServiceService = TestBed.get(DataServiceService);
    expect(service).toBeTruthy();
  });

  // Tests if the HTTP request retrieves the basic info correctly
  it('should receive the basic information when the request is sent',
    () => {

      const mockHttpResponse  : object = {
        "page": 1,
        "per_page": "3",
        "title": "title",
        "total_pages": 4,
        "data": [
          {
            "id": 1,
            "email":"george.bluth@reqres.in",
            "first_name":"George",
            "last_name":"Bluth",
            "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
          }
        ]
      };
      const mockUsersResponse: User[] = [
          new User(
            'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
            'George',
            'Bluth',
            1,
            'george.bluth@reqres.in'
          )
      ];

      // HTTP request
      service.getUsers( 1).subscribe( ( resp: object ) => {
        expect(resp).toEqual(mockHttpResponse);
      });

      const req = httpTestingController.expectOne('https://reqres.in/api/users?page=1');
      expect(req.request.method).toEqual('GET');
      req.flush(mockUsersResponse);
      httpTestingController.verify();
    }
  );

  // Tests if the HTTP request retrieves the issues correctly
  it('should receive a single user information when the request is sent', () => {
    const mockHttpResponse: object = {
      "data": [
        {
          "id": 1,
          "email": "george.bluth@reqres.in",
          "first_name": "George",
          "last_name": "Bluth",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"
        }
      ]
    };

    const mockUserResponse: User = new User(
      "https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg",
      "George",
      "Bluth",
      1,
      "george.bluth@reqres.in"
    );

    // HTTP GET request
    service.getUser( 1 ).subscribe( ( resp: object ) => {
      expect(resp).toEqual(mockHttpResponse);
    });

    const req = httpTestingController.expectOne('https://reqres.in/api/users/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUserResponse);
    httpTestingController.verify();
  });

});
