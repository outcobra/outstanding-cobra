import {SchoolClassDto, SubjectDto} from '../../manage/old/model/manage.dto';

export interface SchoolClassSubjectDto {
    schoolClass: SchoolClassDto,
    subjects: Array<SubjectDto>
}
