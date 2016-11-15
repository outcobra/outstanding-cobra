export interface ManageData {
    institutions: Array<Institution>
}

export interface Institution {
    id: number,
    name: string,
    schoolClasses: Array<SchoolClass>
}

export interface SchoolClass {
    id: number,
    normalizedName: string,
    schoolYears: Array<SchoolYear>
}

export interface SchoolYear {
    id: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    semesters: Array<Semester>
}

export interface Semester {
    id: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    subjects: Array<Subject>
}

export interface Subject {
    id: number,
    name: string
}

