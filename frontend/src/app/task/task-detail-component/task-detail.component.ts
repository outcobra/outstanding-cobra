import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Task} from '../model/Task';
import {ConfirmDialogService} from '../../shared/services/confirm-dialog.service';
import {TaskService} from '../service/task.service';
import {MdDialog, MdDialogRef, MdSlider, MdSliderChange} from '@angular/material';
import {TaskCreateUpdateDialog} from '../task-create-update-dialog/task-create-update-dialog.component';
import {SMALL_DIALOG} from '../../shared/util/const';
import {DialogMode} from '../../common/DialogMode';
import {NotificationsService} from 'angular2-notifications';
import {Observable} from 'rxjs';
import {Util} from '../../shared/util/util';
import {isNotNull, isTrue} from '../../shared/util/helper';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, AfterViewInit {
    public task: Task;
    public taskCreateUpdateDialog: MdDialogRef<TaskCreateUpdateDialog>;
    @ViewChild(MdSlider) public slider: MdSlider;

    constructor(private confirmDialogService: ConfirmDialogService,
                private notificationService: NotificationsService,
                private taskService: TaskService,
                private dialogService: MdDialog,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: {task: Task}) => this.task = data.task);
    }

    ngAfterViewInit() {
        this.slider.change
            .debounceTime(500)
            .map((sliderChange: MdSliderChange) => sliderChange.value)
            .distinctUntilChanged()
            .flatMap((value: number) => Util.bindAndCall(this.updateProgress, this, value))
            .subscribe();
    }

    private updateProgress(value: number): Observable<Task> {
        return this.taskService.updateProgress(this.task.id, value);
    }

    editTask() {
        this.taskCreateUpdateDialog = this.dialogService.open(TaskCreateUpdateDialog, SMALL_DIALOG);
        this.taskCreateUpdateDialog.componentInstance.init(DialogMode.EDIT, this.task);
        this.taskCreateUpdateDialog.afterClosed()
            .filter(isNotNull)
            .flatMap((result: Task) => this.taskService.update(result))
            .subscribe((task: Task) => {
                // TODO error handling?
                if (task) {
                    this.task = task;
                    this.notificationService.success('i18n.modules.task.notification.update.title', 'i18n.modules.task.notification.update.message');
                }
            });
    }

    deleteTask() {
        this.confirmDialogService.open('i18n.modules.task.dialogs.confirmDeleteDialog.title', 'i18n.modules.task.dialogs.confirmDeleteDialog.message')
            .filter(isTrue)
            .flatMap(() => this.taskService.deleteById(this.task.id))
            .subscribe(result => this.router.navigate(['/task']));
    }

    closeCard() {
        this.router.navigate(['/task']);
    }

}
