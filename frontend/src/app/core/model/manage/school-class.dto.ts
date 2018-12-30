import {Dto} from '../../common/dto';

export interface SchoolClassDto extends Dto {
    normalizedName: string;
    userId: number;
    semesterSubjects: Array<{ semesterId: number, subjectIds: Array<number> }>

}
