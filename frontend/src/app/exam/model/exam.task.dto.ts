import {Dto} from '../../core/common/dto';
export interface ExamTaskDto extends Dto {
    task: String
    finished: Boolean
    examId: number
}
