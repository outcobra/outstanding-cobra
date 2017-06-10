import {SchoolClassDto, SubjectDto} from '../../manage/model/manage.dto';

export interface TaskFilterDto {
    schoolClassSubjects: [{
        schoolClass: SchoolClassDto,
        subject: Array<SubjectDto>
    }]
}
