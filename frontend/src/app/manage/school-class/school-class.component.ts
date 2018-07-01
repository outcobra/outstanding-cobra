import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {SchoolClassDto} from '../old/model/manage.dto';
import {ManageService} from '../service/manage.service';

@Component({
    selector: 'app-school-class',
    templateUrl: './school-class.component.html',
    styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {
    private _schoolClasses$: Observable<Array<SchoolClassDto>>;

    constructor(private _manageService: ManageService) {
    }

    ngOnInit() {
        this._schoolClasses$ = this._manageService.getSchoolClasses()
    }


    get schoolClasses$(): Observable<Array<SchoolClassDto>> {
        return this._schoolClasses$;
    }
}
