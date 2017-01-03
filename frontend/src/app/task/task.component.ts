import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {TaskService} from "./service/task.service";
import {Task} from "./model/Task";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TaskComponent implements OnInit {

    private tasks: Task[];

    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.taskService.getAll()
            .subscribe((tasks: Task[]) => this.tasks = tasks);
    }

}
