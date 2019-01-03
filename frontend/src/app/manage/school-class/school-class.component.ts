import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SchoolClassDto} from '../../core/model/manage/school-class.dto';
import {SchoolClassService} from '../../core/services/manage/school-class.service';

@Component({
    selector: 'school-class',
    templateUrl: './school-class.component.html',
    styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {
    private _schoolClasses$: Observable<Array<SchoolClassDto>>;

    private _schoolClassStats: {
        [schoolClassId: number]: {
            semesters: number,
            subjects: number
        }
    };

    constructor(private _schoolClassService: SchoolClassService) {
    }

    ngOnInit() {
        this._schoolClasses$ = this._schoolClassService.readAll()
            .pipe(tap(schoolClasses => this._calculateStats(schoolClasses)));
    }


    private _calculateStats(schoolClasses: Array<SchoolClassDto>) {
        this._schoolClassStats = {};
        for (let schoolClass of schoolClasses) {
            this._schoolClassStats[schoolClass.id] = {
                semesters: schoolClass.semesterSubjects.length,
                subjects: schoolClass.semesterSubjects
                    .reduce((accumulator, current) => accumulator + current.subjectIds.length, 0)
            };
        }
    }

    get schoolClasses$(): Observable<Array<SchoolClassDto>> {
        return this._schoolClasses$;
    }


    get schoolClassStats(): { [schoolClassId: number]: { semesters: number; subjects: number } } {
        return this._schoolClassStats;
    }
}
