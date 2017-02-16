import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../model/Task';
import {ConfirmDialogService} from '../../shared/services/confirm-dialog.service';
import {TaskService} from '../service/task.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import {TaskCreateUpdateDialog} from '../task-create-update-dialog/task-create-update-dialog.component';
import {SMALL_DIALOG} from '../../shared/const/const';
import {DialogMode} from '../../common/DialogMode';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
    private task: Task;
    private taskCreateUpdateDialog: MdDialogRef<TaskCreateUpdateDialog>;

    constructor(private confirmDialogService: ConfirmDialogService,
                private taskService: TaskService,
                private dialogService: MdDialog,
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
        this.taskCreateUpdateDialog = this.dialogService.open(TaskCreateUpdateDialog, SMALL_DIALOG);
        this.taskCreateUpdateDialog.componentInstance.init(DialogMode.EDIT, this.task);
        this.taskCreateUpdateDialog.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    deleteTask() {
        this.confirmDialogService.open('i18n.modules.task.dialogs.confirmDeleteDialog.title', 'i18n.modules.task.dialogs.confirmDeleteDialog.message')
            .subscribe((result: boolean) => {
                if (result === true) {
                    this.taskService.deleteById(this.task.id).subscribe(result => this.router.navigate(['/task']));
                }
            });
    }

    closeCard() {
        this.router.navigate(['/task']);
    }

}
