import {SchoolClassDto, SubjectDto} from "../../manage/model/ManageDto";

export interface TaskFilter {
    schoolClasses: Array<SchoolClassDto>,
    subjects: Array<SubjectDto>
}
