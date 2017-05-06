import {Injectable} from '@angular/core';
import {MockCrudService} from '../../core/mock-crud.service';
import {SchoolYearDto} from '../../../../manage/model/ManageDto';
import {MockSemesterService} from './mock-semester.service';
import * as moment from 'moment/moment';

@Injectable()
export class MockSchoolYearService extends MockCrudService<SchoolYearDto> {
    public static readonly SCHOOLYEAR1_OF_SCHOOLCLASS1 = {
        id: 1,
        schoolClassId: 1,
        name: 'schoolyear1',
        validFrom: moment().subtract(14, 'days').toDate(),
        validTo: moment().add(2, 'months').toDate(),
        semesters: [MockSemesterService.SEMESTER1_OF_SCHOOLYEAR1]
    };

    public static readonly SCHOOLYEAR1_OF_SCHOOLCLASS2 = {
        id: 2,
        schoolClassId: 2,
        name: 'schoolyear2',
        validFrom: moment().subtract(14, 'days').toDate(),
        validTo: moment().add(2, 'months').toDate(),
        semesters: [MockSemesterService.SEMESTER1_OF_SCHOOLYEAR2]
    };

    constructor() {
        super([
            MockSchoolYearService.SCHOOLYEAR1_OF_SCHOOLCLASS1,
            MockSchoolYearService.SCHOOLYEAR1_OF_SCHOOLCLASS2
        ]);
    }
}
