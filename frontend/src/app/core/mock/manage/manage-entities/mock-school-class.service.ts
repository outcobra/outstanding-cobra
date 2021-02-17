import { Injectable } from '@angular/core';
import { SchoolClassDto } from '../../../../manage/model/manage.dto';
import { MockCrudService } from '../../core/mock-crud.service';
import { MockSchoolYearService } from './mock-school-year.service';

@Injectable()
export class MockSchoolClassService extends MockCrudService<SchoolClassDto> {
  public static readonly SCHOOLCLASS1_OF_INSTITUTION1 = {
    id: 1,
    institutionId: 1,
    normalizedName: 'schoolclass1',
    schoolYears: [MockSchoolYearService.SCHOOLYEAR1_OF_SCHOOLCLASS1]
  };

  public static readonly SCHOOLCLASS1_OF_INSTITUTION2 = {
    id: 2,
    institutionId: 2,
    normalizedName: 'schoolclass2',
    schoolYears: [MockSchoolYearService.SCHOOLYEAR1_OF_SCHOOLCLASS2]
  };

  constructor() {
    super([
      MockSchoolClassService.SCHOOLCLASS1_OF_INSTITUTION1,
      MockSchoolClassService.SCHOOLCLASS1_OF_INSTITUTION2
    ]);
  }
}
