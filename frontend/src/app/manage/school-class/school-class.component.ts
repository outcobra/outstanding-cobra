import {Component, OnInit} from '@angular/core';
import {SchoolClassDto} from '../../core/model/manage/school-class.dto';
import {SchoolClassService} from '../../core/services/manage/school-class.service';

@Component({
    selector: 'school-class',
    templateUrl: './school-class.component.html',
    styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {
    private _schoolClasses: Array<SchoolClassDto>;

    private _schoolClassStats: {
        [schoolClassId: number]: {
            semesters: number,
            subjects: number
        }
    };

    constructor(private _schoolClassService: SchoolClassService) {
    }

    ngOnInit() {
        this._schoolClassService.readAll()
            .subscribe(schoolClasses => {
                this._calculateStats(schoolClasses);
                this._schoolClasses = schoolClasses;
            })
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

    get schoolClasses(): Array<SchoolClassDto> {
        return this._schoolClasses;
    }


    get schoolClassStats(): { [schoolClassId: number]: { semesters: number; subjects: number } } {
        return this._schoolClassStats;
    }
}
