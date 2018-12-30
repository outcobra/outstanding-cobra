import {Dto} from '../../common/dto';

export interface SemesterDto extends Dto {
    name: string;
    schoolYearId: number;
    schoolClassSubjects: Array<{ schoolClassId: number, subjectIds: Array<number> }>
}
