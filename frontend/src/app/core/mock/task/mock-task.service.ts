import {Injectable} from '@angular/core';
import {MockCrudService} from '../core/mock-crud.service';
import {Task} from '../../../task/model/Task';
import {Observable} from 'rxjs/Observable';
import {TaskFilter} from '../../../task/model/TaskFilter';
import {MockSubjectService} from '../manage/manage-entities/mock-subject.service';

@Injectable()
export class MockTaskService extends MockCrudService<Task> {
    public static readonly TASK1: Task = {
        id: 1,
        description: 'bla',
        name: 'task1',
        dueDate: new Date(),
        todoDate: new Date(),
        effort: 10,
        progress: 10,
        subject: MockSubjectService.SUBJECT1_OF_SEMESTER1
    };


    constructor() {
        super([MockTaskService.TASK1]);
    }

    getTaskFilter(): Observable<TaskFilter> {
        return Observable.of(null);
    }

    updateProgress(taskId: number, progress: number): Observable<Task> {
        return Observable.of(null);
    }

    isFinished(task: Task): boolean {
        return false;
    }
}
