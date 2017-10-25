import {SchoolClassDto, SubjectDto} from '../../manage/model/manage.dto';

export interface SchoolClassSubjectDto {
    schoolClassSubjects: [{
        schoolClass: SchoolClassDto,
        subjects: Array<SubjectDto>
    }]
}
