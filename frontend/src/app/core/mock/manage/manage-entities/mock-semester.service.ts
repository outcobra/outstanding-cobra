import { Injectable } from '@angular/core';
import * as moment from 'moment/moment';
import { SemesterDto } from '../../../../manage/model/manage.dto';
import { MockCrudService } from '../../core/mock-crud.service';
import { MockSubjectService } from './mock-subject.service';

@Injectable()
export class MockSemesterService extends MockCrudService<SemesterDto> {
  public static readonly SEMESTER1_OF_SCHOOLYEAR1 = {
    id: 1,
    schoolYearId: 1,
    name: 'semester1',
    validFrom: moment().subtract(7, 'days'),
    validTo: moment().add(1, 'months'),
    subjects: [MockSubjectService.SUBJECT1_OF_SEMESTER1]
  };

  public static readonly SEMESTER1_OF_SCHOOLYEAR2 = {
    id: 2,
    schoolYearId: 2,
    name: 'semester2',
    validFrom: moment().subtract(7, 'days'),
    validTo: moment().add(1, 'months'),
    subjects: [MockSubjectService.SUBJECT1_OF_SEMESTER2]
  };

  constructor() {
    super([
      MockSemesterService.SEMESTER1_OF_SCHOOLYEAR1,
      MockSemesterService.SEMESTER1_OF_SCHOOLYEAR2
    ]);
  }

  public mapDates(semester: SemesterDto): SemesterDto {
    return semester;
  }
}
