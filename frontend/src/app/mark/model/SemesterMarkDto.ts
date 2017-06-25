import {ColorDto} from '../../core/model/color.dto';
import {MarkGroupDto} from './mark.group.dto';
import {InstitutionDto, SchoolClassDto} from '../../manage/model/manage.dto';

export interface SemesterMarkDto {
    id: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    institution: InstitutionDto,
    schoolClass: SchoolClassDto,
    subjects: Array<SubjectMarkDto>
}

export interface SubjectMarkDto {
    id: number,
    name: string,
    color: ColorDto,
    subjectMarkGroup: MarkGroupDto
}
