import { Component, OnInit } from '@angular/core';
import {ManageService} from "./manage.service";

@Component({
  selector: 'manager',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(private manageService: ManageService) { }

  ngOnInit() {
      this.manageService.getManageData()
          .subscribe((res) => console.log(res));

  }

}
