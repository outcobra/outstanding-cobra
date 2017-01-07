import {SchoolClassDto, SubjectDto} from "../../manage/model/ManageDto";

export interface TaskFilter {
    subjectClasses: {
        schoolClass: SchoolClassDto,
        subject: Array<SubjectDto>
    }
}
