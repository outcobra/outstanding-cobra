import {Dto} from '../../core/common/dto';
export interface ExamTaskDto extends Dto {
    task: string
    finished: boolean
    examId: number
}
