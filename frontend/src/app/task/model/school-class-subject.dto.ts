import { SchoolClassDto, SubjectDto } from '../../manage/model/manage.dto';

export interface SchoolClassSubjectDto {
  schoolClass: SchoolClassDto,
  subjects: Array<SubjectDto>
}
