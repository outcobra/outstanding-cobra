import {SubjectDto} from '../../manage/model/manage.dto';
import {Dto} from '../../core/common/dto';
import {Moment} from 'moment';

export interface TaskDto extends Dto {
    description: string,
    name: string,
    dueDate: Moment,
    todoDate: Moment,
    effort: number,
    progress: number,
    subject: SubjectDto
}
