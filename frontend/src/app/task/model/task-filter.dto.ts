import {SchoolClassDto, SubjectDto} from '../../manage/model/manage.dto';

export interface TaskFilter {
    schoolClassSubjects: {
        schoolClass: SchoolClassDto,
        subject: Array<SubjectDto>
    }
}
