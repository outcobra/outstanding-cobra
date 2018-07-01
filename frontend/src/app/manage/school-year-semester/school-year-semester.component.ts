import {Component, OnInit} from '@angular/core';
import {ManageService} from '../service/manage.service';
import {Observable} from 'rxjs/index';
import {SchoolYearDto} from '../old/model/manage.dto';

@Component({
    selector: 'app-school-year-semester',
    templateUrl: './school-year-semester.component.html',
    styleUrls: ['./school-year-semester.component.scss']
})
export class SchoolYearSemesterComponent implements OnInit {
    private _schoolYearSemesters$: Observable<Array<SchoolYearDto>>;

    constructor(private _manageService: ManageService) {
    }

    ngOnInit() {
        this._schoolYearSemesters$ = this._manageService.getSchoolYearSemester();
    }

    get schoolYearSemesters$(): Observable<Array<SchoolYearDto>> {
        return this._schoolYearSemesters$;
    }
}
