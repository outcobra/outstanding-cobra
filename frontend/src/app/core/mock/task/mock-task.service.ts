import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of as observableOf } from 'rxjs';
import { SchoolClassSubjectDto } from '../../../task/model/school-class-subject.dto';
import { TaskDto } from '../../../task/model/task.dto';
import { MockCrudService } from '../core/mock-crud.service';
import { MockSubjectService } from '../manage/manage-entities/mock-subject.service';

@Injectable()
export class MockTaskService extends MockCrudService<TaskDto> {
  public static readonly TASK1: TaskDto = {
    id: 1,
    description: 'bla',
    name: 'task1',
    dueDate: moment(),
    todoDate: moment(),
    effort: 10,
    progress: 10,
    subject: MockSubjectService.SUBJECT1_OF_SEMESTER1
  };


  constructor() {
    super([MockTaskService.TASK1]);
  }

  getTaskFilter(): Observable<SchoolClassSubjectDto> {
    return observableOf(null);
  }

  updateProgress(taskId: number, progress: number): Observable<TaskDto> {
    return observableOf(null);
  }

  isFinished(task: TaskDto): boolean {
    return false;
  }
}
