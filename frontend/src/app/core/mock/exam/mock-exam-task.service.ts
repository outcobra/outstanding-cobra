import { Injectable } from '@angular/core';
import { ExamTaskDto } from '../../../exam/model/exam.task.dto';
import { ExamTaskService } from '../../../exam/service/exam-task.service';
import { MockExamService } from './mock-exam.service';

@Injectable()
export class MockExamTaskService extends ExamTaskService {
  private static readonly EXAM_TASK_1: ExamTaskDto = {
    id: 1,
    task: 'Do something',
    finished: false,
    examId: MockExamService.EXAM_1_OF_SUBJECT_1.id
  };
}
