import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from "rxjs";
import {User} from "../../models/user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  // Cache of requested pages
  private pagesCache: { [page: number]: [User[], number] } = {};
  // Cache of users
  private usersCache: { [id: number]: User } = {};

  constructor(private httpClient: HttpClient) { }

  getUsers(page: number): Observable<any[]> {

    // Data available
    if (this.pagesCache[page]) {
      console.log('returning cached pages');
      return of(this.pagesCache[page]);
    }
    // New request needed
    else  {

      return this.httpClient.get(`https://reqres.in/api/users?page=${page}`).pipe(
        map(
          (resp) => {

            let users: User[] = [];

            for (let user of resp['data']) {
              users.push(
                new User(
                  user['avatar'],
                  user['first_name'],
                  user['last_name'],
                  user['id'],
                  user['email']
                )
              );
            }

            this.pagesCache[page] = [users, resp['total_pages']];
            return [users, resp['total_pages']];
          }
        )
      );
    }
  }

  getUser(userId: number): Observable<any> {

    // Data available
    if (this.usersCache[userId]) {
      console.log('returning cached user');
      return of(this.usersCache[userId]);
    }
    // New request needed
    else {
      return this.httpClient.get(`https://reqres.in/api/users/${userId}`).pipe(
        map(
          (resp) => {

            const userData = resp['data'];

            let user = new User(
              userData['avatar'],
              userData['first_name'],
              userData['last_name'],
              userData['id'],
              userData['email']
            );

            this.usersCache[user.id] = user;
            return user;
          }
        )
      );
    }
  }

}
