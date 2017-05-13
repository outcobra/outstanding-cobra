import {Dto} from '../../common/Dto';
import {Color} from '../../core/model/Color';

export interface ManageDto {
    institutions: Array<InstitutionDto>
}

export interface InstitutionDto extends Dto {
    id: number,
    name: string,
    schoolClasses: Array<SchoolClassDto>
}

export interface SchoolClassDto extends Dto {
    id: number,
    institutionId: number,
    normalizedName: string,
    schoolYears: Array<SchoolYearDto>
}

export interface SchoolYearDto extends Dto {
    id: number,
    schoolClassId: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    semesters: Array<SemesterDto>
}

export interface SemesterDto extends Dto {
    id: number,
    schoolYearId: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    subjects: Array<SubjectDto>
}

export interface SubjectDto extends Dto {
    id: number,
    semesterId: number,
    name: string,
    color: Color
}

