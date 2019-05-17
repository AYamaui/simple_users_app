import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataServiceService} from "../../services/data/data-service.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: User[];
  public page: number;
  public usersPerPage: number;
  public totalPages: number;
  public pages: number[];

  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.page = 0;
    this.usersPerPage = 3;
    this.users = [];
    this.pages = [];
    this.getUsers();
  }

  getUsers(page?) {

    if (isNaN(page)) {
      this.page += 1;
    } else {
      this.page = page;
    }

    this.dataService.getUsers(this.page).subscribe(
      ([users, totalPages]) => {

        if (this.users.length === 0) {
          this.totalPages = totalPages;
          this.pages = Array.from({length: this.totalPages}, (v, k) => k+1);
        }

        this.users.push(...users);
      }
    );
  }

  setPage(page) {
    this.page = page;
  }

}
