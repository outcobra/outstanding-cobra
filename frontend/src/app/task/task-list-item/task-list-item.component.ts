import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Task} from '../model/Task';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'task-list-item',
    templateUrl: './task-list-item.component.html',
    styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
    @Input() task: Task;
    @Output('markDone') onMarkDone: EventEmitter<Task> = new EventEmitter<Task>();

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

    isFinished() {
        return this.task.progress == 100;
    }

    markAsDone(event: Event) {
        event.stopPropagation();
        this.onMarkDone.emit(this.task);
    }

    goToDetail() {
        this.router.navigate([this.task.id], {relativeTo: this.activatedRoute});
    }

}
