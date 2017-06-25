import {BaseMarkDto} from './base.mark.dto';
import {MarkDto} from './mark.dto';

export interface MarkGroupDto extends BaseMarkDto {
    markValues: Array<MarkDto>,
    subjectId: number,
    parentGroupId: number,
    markGroups: Array<MarkGroupDto>
}
