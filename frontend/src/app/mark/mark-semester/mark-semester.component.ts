import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SemesterMarkDto} from '../model/SemesterMarkDto';

@Component({
    selector: 'mark-semester',
    templateUrl: './mark-semester.component.html',
    styleUrls: ['./mark-semester.component.scss']
})
export class MarkSemesterComponent implements OnInit {
    public semesterMark: SemesterMarkDto;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.data
            .subscribe(sm => this.semesterMark = sm.semesterMark)
    }

}
