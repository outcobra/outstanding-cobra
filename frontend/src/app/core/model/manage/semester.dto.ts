import {Dto} from '../../common/dto';

export interface SemesterDto extends Dto {
    name: string;
    validFrom: string;
    validTo: string;
    schoolYearId: number;
    schoolClassSubjects: Array<{ schoolClassId: number, subjectIds: Array<number> }>
}
