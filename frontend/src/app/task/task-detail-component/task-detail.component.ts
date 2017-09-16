import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TaskDto} from '../model/task.dto';
import {ConfirmDialogService} from '../../core/services/confirm-dialog.service';
import {TaskService} from '../service/task.service';
import {MdDialog, MdDialogRef, MdSlider, MdSliderChange} from '@angular/material';
import {TaskCreateUpdateDialog} from '../task-create-update-dialog/task-create-update-dialog.component';
import {SMALL_DIALOG} from '../../core/util/const';
import {ViewMode} from '../../core/common/view-mode';
import {Observable} from 'rxjs/Observable';
import {isTrue, isTruthy} from '../../core/util/helper';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';
import {DurationService} from '../../core/services/duration.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements AfterViewInit {
    @Input() task: TaskDto;
    private _taskCreateUpdateDialog: MdDialogRef<TaskCreateUpdateDialog>;
    @ViewChild(MdSlider) slider: MdSlider;

    constructor(private _confirmDialogService: ConfirmDialogService,
                private _notificationService: NotificationWrapperService,
                private _taskService: TaskService,
                private _dialogService: MdDialog,
                private _router: Router,
                private _durationService: DurationService) {
    }

    ngAfterViewInit() {
        this.slider.change
            .debounceTime(500)
            .map((sliderChange: MdSliderChange) => sliderChange.value)
            .distinctUntilChanged()
            .flatMap((value: number) => this.updateProgress.call(this, value))
            .subscribe();
    }

    private updateProgress(value: number): Observable<TaskDto> {
        return this._taskService.updateProgress(this.task.id, value);
    }

    public editTask() {
        this._taskCreateUpdateDialog = this._dialogService.open(TaskCreateUpdateDialog, SMALL_DIALOG);
        this._taskCreateUpdateDialog.componentInstance.init(ViewMode.EDIT, this.task);
        this._taskCreateUpdateDialog.afterClosed()
            .filter(isTruthy)
            .flatMap((result: TaskDto) => this._taskService.update(result))
            .subscribe((task: TaskDto) => {
                // TODO error handling?
                if (task) {
                    this.task = task;
                    this._notificationService.success('i18n.modules.task.notification.update.title',
                        'i18n.modules.task.notification.update.message');
                }
            });
    }

    public getRemainingEffort() {
        let remaining = this.task.effort / 100 * (100 - this.task.progress);
        return this._durationService.humanizeHours(remaining);
    }

    public deleteTask() {
        this._confirmDialogService.open('i18n.modules.task.dialogs.confirmDeleteDialog.title',
            'i18n.modules.task.dialogs.confirmDeleteDialog.message')
            .filter(isTrue)
            .flatMap(() => this._taskService.deleteById(this.task.id))
            .subscribe(result => this._router.navigate(['/task']));
    }
}
