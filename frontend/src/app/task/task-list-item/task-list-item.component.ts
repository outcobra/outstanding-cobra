import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../model/Task';
import {ActivatedRoute, Router} from '@angular/router';
import {isNotNull} from '../../shared/util/helper';

@Component({
    selector: 'task-list-item',
    templateUrl: './task-list-item.component.html',
    styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
    @Input('task') private _task: Task;
    @Output('markDone') onMarkDone: EventEmitter<Task> = new EventEmitter<Task>();

    constructor(private _router: Router,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

    public isFinished() {
        return this._task.progress == 100;
    }

    public markAsDone(event: Event) {
        event.stopPropagation();
        this.onMarkDone.emit(this._task);
    }

    public hasDescription(): boolean {
        return isNotNull(this._task.description);
    }

    public goToDetail() {
        this._router.navigate([this._task.id], {relativeTo: this._activatedRoute});
    }


    get task(): Task {
        return this._task;
    }
}
