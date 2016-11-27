import {Dto} from "../../common/Dto";
export interface ManageData {
    institutions: Array<Institution>
}

export interface Institution extends Dto {
    name: string,
    schoolClasses: Array<SchoolClass>
}

export interface SchoolClass extends Dto {
    normalizedName: string,
    schoolYears: Array<SchoolYear>
}

export interface SchoolYear extends Dto {
    name: string,
    validFrom: Date,
    validTo: Date,
    semesters: Array<Semester>
}

export interface Semester extends Dto {
    name: string,
    validFrom: Date,
    validTo: Date,
    subjects: Array<Subject>
}

export interface Subject extends Dto {
    name: string
}

