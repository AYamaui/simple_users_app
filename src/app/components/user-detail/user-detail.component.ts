import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {DataServiceService} from "../../services/data/data-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public user: User;
  public userId: number;

  constructor(private dataService: DataServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userId = +this.activatedRoute.snapshot.paramMap.get("id");

    this.getUser();
  }

  getUser() {

    this.dataService.getUser(this.userId).subscribe(
      (user) => {
        this.user = user;
    });
  }

}
