import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SemesterService} from '../manage/old/service/semester.service';
import {momentComparator} from '../core/util/comparator';
import {SemesterDto} from '../manage/old/model/manage.dto';
import {Util} from '../core/util/util';
import {DateUtil} from '../core/services/date-util.service';
import {isEmpty, isTruthy} from '../core/util/helper';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {map} from 'rxjs/operators';

@Component({
    selector: 'mark',
    templateUrl: './mark.component.html',
    styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {
    public currentSemester: SemesterDto;
    public semesters: Array<SemesterDto>;

    constructor(private _semesterService: SemesterService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this._semesterService.readAll().pipe(map(semesters =>
            semesters.map(sem => this._semesterService.mapDates(sem))
                .sort((first, second) => momentComparator(first.validFrom, second.validFrom))
        )).subscribe(semesters => {
            this.currentSemester = semesters.find(sem => DateUtil.isBetweenDaysInclusive(moment(),
                DateUtil.transformToMomentIfPossible(sem.validFrom), DateUtil.transformToMomentIfPossible(sem.validTo)));

            this.semesters = isTruthy(this.currentSemester) ? Util.moveToFirst(semesters, this.currentSemester) : semesters;
            if (!this._route.snapshot.children.some(route => route.paramMap.has('semesterId'))) {
                this._initMarkSemesterView();
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    private _initMarkSemesterView() {
        if (isEmpty(this.semesters)) {
            return;
        }
        let toShowSemester = isTruthy(this.currentSemester) ? this.currentSemester : this.semesters[0];
        this._router.navigate(['semester', toShowSemester.id], {
            relativeTo: this._route,
            queryParamsHandling: 'merge'
        });
    }

}
