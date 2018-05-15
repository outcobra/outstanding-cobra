import {Dto} from '../../core/common/dto';
import {MarkDto} from '../../mark/model/mark.dto';
import {ExamTaskDto} from './exam.task.dto';
import {SubjectDto} from '../../manage/old/model/manage.dto';
import {Moment} from 'moment';

export interface ExamDto extends Dto {
    name: string
    description: string
    date: string | Moment
    mark: MarkDto
    examTasks: ExamTaskDto[]
    subject: SubjectDto
}
