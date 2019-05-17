import {async, TestBed} from '@angular/core/testing';

import { DataServiceService } from './data-service.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('DataServiceService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: DataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ DataServiceService, HttpTestingController, HttpClient ],
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ]
  });

    httpClient = TestBed.get(HttpClient);
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

      const mockUsersResponse  : object = {
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
            "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"}
        ]
      };

      // HTTP request
      service.getUsers( 1).subscribe( ( resp: object ) => {
        expect(resp).toEqual(mockUsersResponse);
      });
    }
  );

  // Tests if the HTTP request retrieves the issues correctly
  it('should receive a single user information when the request is sent', async (() => {
    const mockUserResponse  : object = {
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

    // HTTP GET request
    service.getUser( 1 ).subscribe( ( resp: object ) => {
      expect(resp).toEqual(mockUserResponse);
    });
  }));

});
