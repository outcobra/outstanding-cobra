import {ColorDto} from '../../core/model/color.dto';
import {MarkGroupDto} from './mark-group.dto';
import {InstitutionDto, SchoolClassDto} from '../../manage/model/manage.dto';
import {Moment} from 'moment';

export interface SemesterMarkDto {
    id: number,
    name: string,
    validFrom: Moment,
    validTo: Moment,
    institution: InstitutionDto,
    schoolClass: SchoolClassDto,
    value: number,
    subjects: Array<SubjectMarkDto>
}

export interface SubjectMarkDto {
    id: number,
    name: string,
    color: ColorDto,
    subjectMarkGroup: MarkGroupDto
}
