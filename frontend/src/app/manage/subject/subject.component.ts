import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SchoolClassDto, SemesterDto, SubjectDto} from '../old/model/manage.dto';
import {isNotNull} from '../../core/util/helper';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
    private _subjects: Array<SubjectDto>;
    private _semester: SemesterDto;
    private _schoolClass: SchoolClassDto;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.data.subscribe(data => {
            this._subjects = data.subjects;
            if (isNotNull(data.semester)) {
                this._semester = data.semester;
            }
            if (isNotNull(data.schoolClass)) {
                this._schoolClass = data.schoolClass;
            }
        });
    }

    get subjects(): Array<SubjectDto> {
        return this._subjects;
    }

    get semester(): SemesterDto {
        return this._semester;
    }

    get schoolClass(): SchoolClassDto {
        return this._schoolClass;
    }
}
