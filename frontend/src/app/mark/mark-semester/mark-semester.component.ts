import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SemesterMarkDto} from '../model/SemesterMarkDto';
import {isTruthy} from '../../core/util/helper';

@Component({
    selector: 'mark-semester',
    templateUrl: './mark-semester.component.html',
    styleUrls: ['./mark-semester.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MarkSemesterComponent implements OnInit {
    public semesterMark: SemesterMarkDto;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.data
            .do(console.log)
            .subscribe((sm: { semesterMark: SemesterMarkDto }) => this.semesterMark = sm.semesterMark)
    }

    public isTruthy(val: any): boolean {
        return isTruthy(val);
    }

}
