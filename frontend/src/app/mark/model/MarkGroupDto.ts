import {BaseMarkDto} from './BaseMarkDto';
import {MarkDto} from './MarkDto';

export interface MarkGroupDto extends BaseMarkDto {
    marks: Array<MarkDto>,
    subjectId: number,
    parentGroupId: number,
    markGroups: Array<number>
}
