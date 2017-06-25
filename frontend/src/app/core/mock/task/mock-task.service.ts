import {Injectable} from '@angular/core';
import {MockCrudService} from '../core/mock-crud.service';
import {TaskDto} from '../../../task/model/task.dto';
import {Observable} from 'rxjs/Observable';
import {TaskFilterDto} from '../../../task/model/task-filter.dto';
import {MockSubjectService} from '../manage/manage-entities/mock-subject.service';

@Injectable()
export class MockTaskService extends MockCrudService<TaskDto> {
    public static readonly TASK1: TaskDto = {
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

    getTaskFilter(): Observable<TaskFilterDto> {
        return Observable.of(null);
    }

    updateProgress(taskId: number, progress: number): Observable<TaskDto> {
        return Observable.of(null);
    }

    isFinished(task: TaskDto): boolean {
        return false;
    }
}