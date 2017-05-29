import {Component, OnInit} from '@angular/core';
import {SemesterService} from '../manage/service/semester.service';
import {dateComparator} from '../core/util/comparator';
import {SemesterDto} from '../manage/model/ManageDto';
import {Util} from '../core/util/util';
import {DateUtil} from '../core/services/date-util.service';
import {isTruthy} from '../core/util/helper';

@Component({
    selector: 'mark',
    templateUrl: './mark.component.html',
    styleUrls: ['./mark.component.scss']
})
export class MarkComponent implements OnInit {
    public currentSemester: SemesterDto;
    public semesters: Array<SemesterDto>;

    constructor(private _semesterService: SemesterService) {
    }

    ngOnInit() {
        this._semesterService.readAll()
            .map(semesters => semesters.sort((first, second) => dateComparator(first.validFrom, second.validFrom)))
            .subscribe(semesters => {
                this.currentSemester = semesters.find(sem => DateUtil.isBetweenDay(new Date(), sem.validFrom, sem.validTo));
                this.semesters = isTruthy(this.currentSemester) ? Util.moveToFirst(semesters, this.currentSemester) : semesters;
            });
    }

}
