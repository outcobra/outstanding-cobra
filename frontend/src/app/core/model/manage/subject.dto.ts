import {SchoolClassSemesterDto} from './school-class-semester.dto';

export interface SubjectDto {
    id: number;
    name: string;
    userId: number;
    schoolClassSemesters: Array<SchoolClassSemesterDto>;
}
