import { Moment } from 'moment';
import { Dto } from '../../core/common/dto';
import { SubjectDto } from '../../manage/model/manage.dto';
import { MarkDto } from '../../mark/model/mark.dto';
import { ExamTaskDto } from './exam.task.dto';

export interface ExamDto extends Dto {
  name: string
  description: string
  date: string | Moment
  mark: MarkDto
  examTasks: ExamTaskDto[]
  subject: SubjectDto
}
