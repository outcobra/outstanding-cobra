import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isNotNull} from '../../core/util/helper';
import {SubjectDto} from '../../core/model/manage/subject.dto';
import {SemesterDto} from '../../core/model/manage/semester.dto';
import {SchoolClassDto} from '../../core/model/manage/school-class.dto';

export interface AggregatedSchoolClassSemester {
    schoolClass: SchoolClassDto,
    semesters: Array<SemesterDto>
}

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
    private _subjects: Array<SubjectDto>;
    private _subjectToSchoolClasses: { [key: number]: Array<AggregatedSchoolClassSemester> };
    private _semester: SemesterDto;
    private _schoolClass: SchoolClassDto;

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.data.subscribe(data => {
            this._subjects = data.subjects;
            this._subjectToSchoolClasses = this._groupSchoolClasses(data.subjects);
            if (isNotNull(data.semester)) {
                console.log(data.semester);
                this._semester = data.semester;
            }
            if (isNotNull(data.schoolClass)) {
                this._schoolClass = data.schoolClass;
            }
        });
    }

    public getSchoolClassSemesters(subjectId: number) {
        return this._subjectToSchoolClasses[subjectId];
    }

    public buildSchoolClassUrl() {
        return [this._buildRelativeUrlPart(), 'schoolClass'];
    }

    public buildSemesterUrl(semester: SemesterDto, schoolClass: SchoolClassDto) {
        return [
            this._buildRelativeUrlPart(),
            'schoolYear',
            semester.schoolYearId,
            'schoolClass',
            schoolClass.id
        ];
    }

    private _buildRelativeUrlPart(): string {
        let urlParts = '..';
        if (isNotNull(this._semester)) {
            urlParts += '/../..';
        }
        if (isNotNull(this._schoolClass)) {
            urlParts += '/../..';
        }
        return urlParts;
    }

    private _groupSchoolClasses(subjects: Array<SubjectDto>) {
        const result = {};

        for (let subject of subjects) {
            let grouped = [];
            for (let schoolClassSemester of subject.schoolClassSemesters) {
                const sameClass = grouped.find(s => s.schoolClass.id === schoolClassSemester.schoolClass.id);
                if (isNotNull(sameClass)) {
                    sameClass.semesters.push(schoolClassSemester.semester);
                } else {
                    grouped.push({
                        schoolClass: schoolClassSemester.schoolClass,
                        semesters: [schoolClassSemester.semester]
                    });
                }
            }
            result[subject.id] = grouped;
        }
        return result;
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
