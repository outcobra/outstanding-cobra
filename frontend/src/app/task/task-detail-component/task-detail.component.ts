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
    private _task: Task;
    private _taskCreateUpdateDialog: MdDialogRef<TaskCreateUpdateDialog>;
    @ViewChild(MdSlider) private _slider: MdSlider;

    constructor(private _confirmDialogService: ConfirmDialogService,
                private _notificationService: NotificationsService,
                private _taskService: TaskService,
                private _dialogService: MdDialog,
                private _route: ActivatedRoute,
                private _router: Router) {
    }

    ngOnInit() {
        this._route.data
            .subscribe((data: {task: Task}) => this._task = data.task);
    }

    ngAfterViewInit() {
        this._slider.change
            .debounceTime(500)
            .map((sliderChange: MdSliderChange) => sliderChange.value)
            .distinctUntilChanged()
            .flatMap((value: number) => Util.bindAndCall(this.updateProgress, this, value))
            .subscribe();
    }

    private updateProgress(value: number): Observable<Task> {
        return this._taskService.updateProgress(this._task.id, value);
    }

    public editTask() {
        this._taskCreateUpdateDialog = this._dialogService.open(TaskCreateUpdateDialog, SMALL_DIALOG);
        this._taskCreateUpdateDialog.componentInstance.init(DialogMode.EDIT, this._task);
        this._taskCreateUpdateDialog.afterClosed()
            .filter(isNotNull)
            .flatMap((result: Task) => this._taskService.update(result))
            .subscribe((task: Task) => {
                // TODO error handling?
                if (task) {
                    this._task = task;
                    this._notificationService.success('i18n.modules.task.notification.update.title', 'i18n.modules.task.notification.update.message');
                }
            });
    }

    public deleteTask() {
        this._confirmDialogService.open('i18n.modules.task.dialogs.confirmDeleteDialog.title', 'i18n.modules.task.dialogs.confirmDeleteDialog.message')
            .filter(isTrue)
            .flatMap(() => this._taskService.deleteById(this._task.id))
            .subscribe(result => this._router.navigate(['/task']));
    }

    public closeCard() {
        this._router.navigate(['/task']);
    }


    get task(): Task {
        return this._task;
    }

    get taskCreateUpdateDialog(): MdDialogRef<TaskCreateUpdateDialog> {
        return this._taskCreateUpdateDialog;
    }
}
