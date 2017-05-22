import {Color} from '../../core/model/Color';
import {MarkGroupDto} from './MarkGroupDto';
export interface SemesterMarkDto {
    id: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    subjects: Array<SubjectMarkDto>
}

export interface SubjectMarkDto {
    id: number,
    name: string,
    color: Color,
    subjectMarkGroup: MarkGroupDto
}
