import { Injectable } from '@angular/core';
import { SubjectDto } from '../../../../manage/model/manage.dto';
import { MockCrudService } from '../../core/mock-crud.service';

@Injectable()
export class MockSubjectService extends MockCrudService<SubjectDto> {
  public static readonly SUBJECT1_OF_SEMESTER1 = {
    id: 1,
    semesterId: 1,
    name: 'subject1',
    color: {
      name: 'grey',
      hex: '515151',
      index: 1
    }
  };

  public static readonly SUBJECT1_OF_SEMESTER2 = {
    id: 2,
    semesterId: 2,
    name: 'subject2',
    color: {
      name: 'grey',
      hex: '515151',
      index: 1
    }
  };

  constructor() {
    super([
      MockSubjectService.SUBJECT1_OF_SEMESTER1,
      MockSubjectService.SUBJECT1_OF_SEMESTER2
    ]);
  }
}
