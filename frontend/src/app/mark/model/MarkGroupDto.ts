import {BaseMarkDto} from './BaseMarkDto';
import {MarkDto} from './MarkDto';

export interface MarkGroupDto extends BaseMarkDto {
    markValues: Array<MarkDto>,
    subjectId: number,
    parentGroupId: number,
    markGroups: Array<MarkGroupDto>
}
