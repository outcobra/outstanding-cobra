import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../model/Task";

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
    private task: Task;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: {task: Task}) => {
                this.task = data.task;
            })
    }

    closeCard() {
        this.router.navigate(['/task']);
    }

}
