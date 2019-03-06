import { Dto } from '../../common/dto';

export interface SchoolYearDto extends Dto {
    name: string;
    validFrom: string;
    validTo: string;
    semesterIds: Array<number>
}
