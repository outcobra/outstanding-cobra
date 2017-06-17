import {SubjectDto} from '../../manage/model/manage.dto';
import {Dto} from '../../core/common/dto';

export interface TaskDto extends Dto {
    description: string,
    name: string,
    dueDate: Date,
    todoDate: Date,
    effort: number,
    progress: number,
    subject: SubjectDto
}
