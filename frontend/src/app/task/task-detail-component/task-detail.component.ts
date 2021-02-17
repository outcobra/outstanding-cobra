import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { NotificationWrapperService } from '../../core/notifications/notification-wrapper.service';
import { ConfirmDialogService } from '../../core/services/confirm-dialog.service';
import { DurationService } from '../../core/services/duration.service';
import { isEmpty, isTrue } from '../../core/util/helper';
import { TaskDto } from '../model/task.dto';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements AfterViewInit {
  @Input() task: TaskDto;
  @ViewChild(MatSlider, { static: true }) slider: MatSlider;

  constructor(private _confirmDialogService: ConfirmDialogService,
              private _notificationService: NotificationWrapperService,
              private _taskService: TaskService,
              private _dialogService: MatDialog,
              private _router: Router,
              private _durationService: DurationService) {
  }

  ngAfterViewInit() {
    this.slider.change
      .pipe(
        debounceTime(500),
        map((sliderChange: MatSliderChange) => sliderChange.value),
        distinctUntilChanged(),
        switchMap((value: number) => this.updateProgress.call(this, value))
      )
      .subscribe();
  }

  private updateProgress(value: number): Observable<TaskDto> {
    return this._taskService.updateProgress(this.task.id, value);
  }

  public getRemainingEffort() {
    let remaining = this.task.effort / 100 * (100 - this.task.progress);
    return this._durationService.humanizeHours(remaining);
  }

  public deleteTask() {
    this._confirmDialogService.open('i18n.modules.task.dialogs.confirmDeleteDialog.title',
      'i18n.modules.task.dialogs.confirmDeleteDialog.message')
      .pipe(
        filter(isTrue),
        switchMap(() => this._taskService.deleteById(this.task.id))
      )
      .subscribe(result => this._router.navigate(['/task']));
  }

  public isEmpty(val: string): boolean {
    return isEmpty(val);
  }
}
