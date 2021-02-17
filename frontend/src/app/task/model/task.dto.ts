import { Moment } from 'moment';
import { Dto } from '../../core/common/dto';
import { SubjectDto } from '../../manage/model/manage.dto';

export interface TaskDto extends Dto {
  description: string,
  name: string,
  dueDate: Moment,
  todoDate: Moment,
  effort: number,
  progress: number,
  subject: SubjectDto
}
