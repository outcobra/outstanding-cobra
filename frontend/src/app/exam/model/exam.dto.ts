import {Dto} from '../../core/common/dto';
import {MarkDto} from '../../mark/model/mark.dto';
import {ExamTaskDto} from './exam.task.dto';
import {SubjectDto} from '../../manage/model/manage.dto';

export interface ExamDto extends Dto {
    name: string
    description: string
    date: string | Date
    mark: MarkDto
    examTasks: ExamTaskDto[]
    subject: SubjectDto
}
