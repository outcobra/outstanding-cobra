import {Injectable} from '@angular/core';
import {SubjectDto} from '../../../manage/model/ManageDto';
import {MockCrudService} from '../core/mock-crud.service';
import {Task} from '../../../task/model/Task';
import {Observable} from 'rxjs/Observable';
import {TaskFilter} from '../../../task/model/TaskFilter';

@Injectable()
export class MockTaskService extends MockCrudService<Task> {
    public static readonly TASK1 = {
        id: 1,
        description: 'bla',
        name: 'task1',
        dueDate: new Date(),
        todoDate: new Date(),
        effort: 10,
        progress: 10,
        subject: {
            id: 1,
            name: 'subject1',
            color: {
                name: 'grey',
                hex: '121212',
                index: 1
            },
            semesterId: 1
        } as SubjectDto
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
