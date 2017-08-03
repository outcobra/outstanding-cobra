import {SchoolClassDto, SubjectDto} from '../../manage/model/manage.dto';

export interface SubjectFilterDto {
    schoolClassSubjects: [{
        schoolClass: SchoolClassDto,
        subject: Array<SubjectDto>
    }]
}
