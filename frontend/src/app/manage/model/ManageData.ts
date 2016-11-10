export interface ManageData {
    institutions: Array<Institution>}

interface Institution {
    id: number,
    name: string,
    schoolClasses: Array<SchoolClass>
}

interface SchoolClass {
    id: number,
    normalizedName: string,
    schoolYears: Array<SchoolYear>
}

interface SchoolYear {
    id: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    semesters: Array<Semester>
}

interface Semester {
    id: number,
    name: string,
    validFrom: Date,
    validTo: Date,
    subjects: Array<Subject>
}

interface Subject {
    id: number,
    name: string
}

