import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TaskDto} from '../model/task.dto';
import {ConfirmDialogService} from '../../core/services/confirm-dialog.service';
import {TaskService} from '../service/task.service';
import {MatDialog, MatSlider, MatSliderChange} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {isTrue} from '../../core/util/helper';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';
import {DurationService} from '../../core/services/duration.service';

@Component({
    selector: 'task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements AfterViewInit {
    @Input() task: TaskDto;
    @ViewChild(MatSlider) slider: MatSlider;

    constructor(private _confirmDialogService: ConfirmDialogService,
                private _notificationService: NotificationWrapperService,
                private _taskService: TaskService,
                private _dialogService: MatDialog,
                private _router: Router,
                private _durationService: DurationService) {
    }

    ngAfterViewInit() {
        this.slider.change
            .debounceTime(500)
            .map((sliderChange: MatSliderChange) => sliderChange.value)
            .distinctUntilChanged()
            .switchMap((value: number) => this.updateProgress.call(this, value))
            .subscribe();
    }

    private updateProgress(value: number): Observable<TaskDto> {
        return this._taskService.updateProgress(this.task.id, value);
    }

    public editTask() {
        /*this._taskCreateUpdateDialog = this._dialogService.open(TaskCreateUpdateComponent, SMALL_DIALOG);
        this._taskCreateUpdateDialog.componentInstance.init(ViewMode.EDIT, this.task);
        this._taskCreateUpdateDialog.afterClosed()
            .filter(isTruthy)
            .switchMap((result: TaskDto) => this._taskService.update(result))
            .subscribe((task: TaskDto) => {
                // TODO error handling?
                if (task) {
                    this.task = task;
                    this._notificationService.success('i18n.modules.task.notification.update.title',
                        'i18n.modules.task.notification.update.message');
                }
            });*/
    }

    public getRemainingEffort() {
        let remaining = this.task.effort / 100 * (100 - this.task.progress);
        return this._durationService.humanizeHours(remaining);
    }

    public deleteTask() {
        this._confirmDialogService.open('i18n.modules.task.dialogs.confirmDeleteDialog.title',
            'i18n.modules.task.dialogs.confirmDeleteDialog.message')
            .filter(isTrue)
            .switchMap(() => this._taskService.deleteById(this.task.id))
            .subscribe(result => this._router.navigate(['/task']));
    }
}
