import {Dto} from '../../core/common/dto';
import {MarkDto} from '../../mark/model/mark.dto';
import {ExamTaskDto} from './exam.task.dto';

export interface ExamDto extends Dto {
    name: string
    date: string | Date
    subjectName: String
    mark: MarkDto
    examTasks: ExamTaskDto[]
    subjectId: number
}
