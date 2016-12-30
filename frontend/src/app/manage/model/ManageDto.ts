import {Dto} from "../../common/Dto";
import {Color} from "../../shared/model/Color";

export interface ManageDto {
    institutions: Array<InstitutionDto>
}

export interface InstitutionDto extends Dto {
    name: string,
    schoolClasses: Array<SchoolClassDto>
}

export interface SchoolClassDto extends Dto {
    institutionId: number,
    normalizedName: string,
    schoolYears: Array<SchoolYearDto>
}

export interface SchoolYearDto extends Dto {
    schoolClassId: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    semesters: Array<SemesterDto>
}

export interface SemesterDto extends Dto {
    schoolYearId: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    subjects: Array<SubjectDto>
}

export interface SubjectDto extends Dto {
    semesterId: number,
    name: string,
    color: Color
}

