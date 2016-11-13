import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ManageService} from "./manage.service";
import {ManageData} from "./model/ManageData";

@Component({
    selector: 'manager',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManageComponent implements OnInit {

    private manageData: ManageData;

    constructor(private manageService: ManageService) {
    }

    ngOnInit() {
        this.manageService.getManageData()
            .subscribe((res) => {this.manageData = res; console.log(res)});
    }

}
