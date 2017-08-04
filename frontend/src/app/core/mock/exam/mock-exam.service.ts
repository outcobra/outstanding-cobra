import {Injectable} from '@angular/core';
import {ExamService} from '../../../exam/service/exam.service';
import {ExamDto} from '../../../exam/model/exam.dto';
import {MockMarkService} from '../mark/mock-mark.service';
import {MockSubjectService} from '../manage/manage-entities/mock-subject.service';

@Injectable()
export class MockExamService extends ExamService {
    public static readonly EXAM_1_OF_SUBJECT_1: ExamDto = {
        id: 1,
        name: 'Exam1',
        description: 'Exam1 desc',
        date: new Date().toDateString(),
        mark: MockMarkService.MARK_1,
        subject: MockSubjectService.SUBJECT1_OF_SEMESTER1,
        examTasks: []
    };
}
