import {SchoolClassDto} from './school-class.dto';
import {SemesterDto} from './semester.dto';
import {SubjectDto} from './subject.dto';

export interface SchoolClassSemesterSubjectDto {
    schoolClass: SchoolClassDto;
    semester: SemesterDto;
    subject: SubjectDto;
}
