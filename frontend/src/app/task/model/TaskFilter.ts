import {SchoolClassDto, SubjectDto} from '../../manage/model/ManageDto';

export interface TaskFilter {
    schoolClassSubjects: {
        schoolClass: SchoolClassDto,
        subject: Array<SubjectDto>
    }
}
