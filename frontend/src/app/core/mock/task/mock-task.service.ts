import {Injectable} from '@angular/core';
import {MockCrudService} from '../core/mock-crud.service';
import {TaskDto} from '../../../task/model/task.dto';
import {Observable} from 'rxjs/Observable';
import {SubjectFilterDto} from '../../../task/model/subject-filter.dto';
import {MockSubjectService} from '../manage/manage-entities/mock-subject.service';
import * as moment from 'moment';

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

    getTaskFilter(): Observable<SubjectFilterDto> {
        return Observable.of(null);
    }

    updateProgress(taskId: number, progress: number): Observable<TaskDto> {
        return Observable.of(null);
    }

    isFinished(task: TaskDto): boolean {
        return false;
    }
}
