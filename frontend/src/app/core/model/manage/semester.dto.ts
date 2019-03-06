import {Dto} from '../../common/dto';
import { Moment } from 'moment';

export interface SemesterDto extends Dto {
    name: string;
    validFrom: string | Moment;
    validTo: string | Moment;
    schoolYearId: number;
    schoolClassSubjects: Array<{ schoolClassId: number, subjectIds: Array<number> }>
}
