import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskDto} from '../model/task.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {isTruthy} from '../../core/util/helper';
import {TaskService} from '../service/task.service';

@Component({
    selector: 'task-list-item',
    templateUrl: './task-list-item.component.html',
    styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
    @Input() task: TaskDto;
    @Output('markDone') onMarkDone: EventEmitter<TaskDto> = new EventEmitter<TaskDto>();

    constructor(private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private _taskService: TaskService) {
    }

    ngOnInit() {
    }

    public isFinished() {
        return this._taskService.isFinished(this.task);
    }

    public markAsDone(event: Event) {
        event.stopPropagation();
        this.onMarkDone.emit(this.task);
    }

    public hasDescription(): boolean {
        return isTruthy(this.task.description);
    }

    public goToDetail() {
        this._router.navigate([this.task.id], {relativeTo: this._activatedRoute});
    }
}
