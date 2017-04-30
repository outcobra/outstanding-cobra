import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../model/Task';
import {ActivatedRoute, Router} from '@angular/router';
import {isNotNull} from '../../shared/util/helper';
import {TaskService} from '../service/task.service';

@Component({
    selector: 'task-list-item',
    templateUrl: './task-list-item.component.html',
    styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
    @Input() task: Task;
    @Output('markDone') onMarkDone: EventEmitter<Task> = new EventEmitter<Task>();

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private taskService: TaskService) {
    }

    ngOnInit() {
    }

    isFinished() {
        return this.taskService.isFinished(this.task);
    }

    markAsDone(event: Event) {
        event.stopPropagation();
        this.onMarkDone.emit(this.task);
    }

    hasDesc(): boolean {
        return isNotNull(this.task.description);
    }

    goToDetail() {
        this.router.navigate([this.task.id], {relativeTo: this.activatedRoute});
    }

}
