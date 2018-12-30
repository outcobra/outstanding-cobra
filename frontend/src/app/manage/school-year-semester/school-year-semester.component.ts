import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ManageService} from '../service/manage.service';
import {SchoolClassDto, SchoolYearDto} from '../old/model/manage.dto';
import {ActivatedRoute} from '@angular/router';
import {isNotNull} from '../../core/util/helper';
import {filter, map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Component({
    selector: 'school-year-semester',
    templateUrl: './school-year-semester.component.html',
    styleUrls: ['./school-year-semester.component.scss'],
    host: {
        class: 'school-year-semester'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolYearSemesterComponent implements OnInit {
    private _activeSchoolYearId$: Subject<number> = new BehaviorSubject(null);

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

            this._route.paramMap
                .pipe(
                    filter(params => params.has('schoolYearId')),
                    map(params => params.get('schoolYearId')),
                    map(schoolYearId => parseInt(schoolYearId))
                )
                .subscribe(schoolYearId => this._activeSchoolYearId$.next(schoolYearId));
        });
    }

    public goToSubjectsUrl(semesterId: number, schoolYearId: number): any[] {
        let base = '../subject';
        const semesterBase: any[] = ['semester', semesterId];

        if (schoolYearId) {
            base = '../' + base;
        }
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


    get activeSchoolYearId$(): Observable<number> {
        return this._activeSchoolYearId$.asObservable();
    }
}
