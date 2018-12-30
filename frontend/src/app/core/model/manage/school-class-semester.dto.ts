import {SchoolClassDto} from './school-class.dto';
import {SemesterDto} from './semester.dto';

export interface SchoolClassSemesterDto {
    schoolClass: SchoolClassDto;
    semester: SemesterDto;
}
