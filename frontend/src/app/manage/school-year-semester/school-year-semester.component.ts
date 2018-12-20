import {Component, OnInit} from '@angular/core';
import {ManageService} from '../service/manage.service';
import {SchoolClassDto, SchoolYearDto} from '../old/model/manage.dto';
import {ActivatedRoute} from '@angular/router';
import {isNotNull} from '../../core/util/helper';

@Component({
    selector: 'school-year-semester',
    templateUrl: './school-year-semester.component.html',
    styleUrls: ['./school-year-semester.component.scss'],
    host: {
        class: 'school-year-semester'
    }
})
export class SchoolYearSemesterComponent implements OnInit {
    private _schoolYearSemesters: Array<SchoolYearDto>;
    private _schoolClass: SchoolClassDto;

    constructor(private _route: ActivatedRoute,
                private _manageService: ManageService) {
    }

    ngOnInit() {
        this._route.data.subscribe(data => {
            this._schoolYearSemesters = data.schoolYears;
            if (isNotNull(data.schoolClass)) {
                this._schoolClass = data.schoolClass;
            }
        });
    }

    public goToSubjectsUrl(semesterId: number): any[] {
        const base = '../subject';
        const semesterBase: any[] = ['semester', semesterId];

        if (this._schoolClass) {
            return [
                '../../'.concat(base),
                'schoolClass',
                this._schoolClass.id,
                ...semesterBase
            ];
        }
        return [base, ...semesterBase];
    }

    get schoolYearSemesters(): Array<SchoolYearDto> {
        return this._schoolYearSemesters;
    }


    get schoolClass(): SchoolClassDto {
        return this._schoolClass;
    }
}
