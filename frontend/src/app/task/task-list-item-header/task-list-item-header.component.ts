import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {TaskDto} from '../model/task.dto';
import {isTruthy} from '../../core/util/helper';
import {TaskService} from '../service/task.service';

@Component({
    selector: 'task-list-item-header',
    templateUrl: './task-list-item-header.component.html',
    styleUrls: ['./task-list-item-header.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TaskListItemHeaderComponent {
    @Input() task: TaskDto;
    @Output('markDone') onMarkDone: EventEmitter<TaskDto> = new EventEmitter();

    constructor(private _taskService: TaskService) {
    }

    public isFinished() {
        return this._taskService.isFinished(this.task);
    }

    public hasDescription(): boolean {
        return isTruthy(this.task.description);
    }

    public markAsDone(event: Event) {
        event.stopPropagation();
        this.onMarkDone.emit(this.task);
    }

}
