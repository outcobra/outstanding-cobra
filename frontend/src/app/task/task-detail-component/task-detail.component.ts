import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Task} from "../model/Task";
import {ConfirmDialogService} from "../../shared/services/confirm-dialog.service";
import {TaskService} from "../service/task.service";

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
    private task: Task;

    constructor(private confirmDialogService: ConfirmDialogService,
                private taskService: TaskService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: {task: Task}) => {
                this.task = data.task;
            })
    }

    editTask() {

    }

    deleteTask() {
        this.confirmDialogService.open('i18n.modules.task.dialogs.confirmDeleteDialog.title', 'i18n.modules.task.dialogs.confirmDeleteDialog.message')
            .subscribe((result: boolean) => {
                if (result === true) {
                    this.taskService.deleteById(this.task.id).subscribe();
                }
            });
    }

    closeCard() {
        this.router.navigate(['/task']);
    }

}
