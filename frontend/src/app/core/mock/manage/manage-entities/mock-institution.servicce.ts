import { Injectable } from '@angular/core';
import { InstitutionDto } from '../../../../manage/model/manage.dto';
import { MockCrudService } from '../../core/mock-crud.service';
import { MockSchoolClassService } from './mock-school-class.service';

@Injectable()
export class MockInstitutionService extends MockCrudService<InstitutionDto> {
  public static readonly INSTITUTION1 = {
    id: 1,
    name: 'institution1',
    schoolClasses: [MockSchoolClassService.SCHOOLCLASS1_OF_INSTITUTION1]
  };

  public static readonly INSTITUTION2 = {
    id: 2,
    name: 'institution2',
    schoolClasses: [MockSchoolClassService.SCHOOLCLASS1_OF_INSTITUTION2]
  };

  constructor() {
    super([
      MockInstitutionService.INSTITUTION1,
      MockInstitutionService.INSTITUTION2
    ]);
  }
}
