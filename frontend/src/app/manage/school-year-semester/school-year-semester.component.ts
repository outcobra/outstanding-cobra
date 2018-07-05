import {Component, OnInit} from '@angular/core';
import {ManageService} from '../service/manage.service';
import {Observable, ReplaySubject} from 'rxjs/index';
import {SchoolYearDto} from '../old/model/manage.dto';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'school-year-semester',
    templateUrl: './school-year-semester.component.html',
    styleUrls: ['./school-year-semester.component.scss']
})
export class SchoolYearSemesterComponent implements OnInit {
    private _schoolYearSemesters$: ReplaySubject<Array<SchoolYearDto>> = new ReplaySubject<Array<SchoolYearDto>>();

    constructor(private _route: ActivatedRoute,
                private _manageService: ManageService) {
    }

    ngOnInit() {
        this._route.data.subscribe(data => this._schoolYearSemesters$.next(data.schoolYears));
    }

    get schoolYearSemesters$(): Observable<Array<SchoolYearDto>> {
        return this._schoolYearSemesters$;
    }
}
