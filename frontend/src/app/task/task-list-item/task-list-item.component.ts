import {Component, OnInit, Input} from "@angular/core";
import {Task} from "../model/Task";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'task-list-item',
    templateUrl: './task-list-item.component.html',
    styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {
    @Input() task: Task;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

    goToDetail() {
        this.router.navigate([this.task.id], {relativeTo: this.activatedRoute});
    }

}
