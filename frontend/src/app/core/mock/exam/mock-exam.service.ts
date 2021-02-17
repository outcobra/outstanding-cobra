import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ExamDto } from '../../../exam/model/exam.dto';
import { ExamService } from '../../../exam/service/exam.service';
import { MockSubjectService } from '../manage/manage-entities/mock-subject.service';
import { MockMarkService } from '../mark/mock-mark.service';

@Injectable()
export class MockExamService extends ExamService {
  public static readonly EXAM_1_OF_SUBJECT_1: ExamDto = {
    id: 1,
    name: 'Exam1',
    description: 'Exam1 desc',
    date: moment(),
    mark: MockMarkService.MARK_1,
    subject: MockSubjectService.SUBJECT1_OF_SEMESTER1,
    examTasks: []
  };
}
