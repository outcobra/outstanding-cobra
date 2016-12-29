import {Component, OnInit} from "@angular/core";
import {TaskService} from "./service/task.service";
import {Task} from "./model/Task";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

    private tasks: Task[];

    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.taskService.getAllTasks()
            .subscribe((tasks: Task[]) => this.tasks = tasks);
    }

}
