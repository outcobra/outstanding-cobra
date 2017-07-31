import {Component, OnInit} from '@angular/core';
import {ExamService} from './service/exam.service';
import {ExamDto} from './model/exam.dto';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';
import {ExamTaskDto} from './model/exam.task.dto';
import {FormControl, FormGroup} from '@angular/forms';
import {ExamCreateUpdateDialog} from './create-update-dialog/exam-create-update-dialog.component';
import {MdDialog} from '@angular/material';
import {ResponsiveHelperService} from '../core/services/ui/responsive-helper.service';
import {DialogMode} from '../core/common/dialog-mode';
import {MEDIUM_DIALOG} from '../core/util/const';
import {ConfirmDialogService} from '../core/services/confirm-dialog.service';
import {isTruthy} from '../core/util/helper';
import {Util} from '../core/util/util';
import * as objectAssign from 'object-assign';

@Component({
    selector: 'exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

    private _activeExams: ExamDto[] = [];
    private _allExams: ExamDto[] = [];
    private displayedExams: ExamDto[] = [];

    private _searchFilter: string = '';
    private _searchForm: FormGroup;

    constructor(private _examService: ExamService,
                private _dialogService: MdDialog,
                private _responsiveHelper: ResponsiveHelperService,
                private _notificationService: NotificationWrapperService,
                private _confirmDialogService: ConfirmDialogService) {
    }

    ngOnInit() {
        this._searchForm = new FormGroup({
            searchTerm: new FormControl()
        });
        this._loadActiveExams();
        this._loadAllExams();
        //this._displayForFilter()
    }

    private _loadActiveExams() {
        this._examService.readAllActive().subscribe((activeExams: ExamDto[]) => {
            this._activeExams = activeExams;
        });
    }

    private _loadAllExams() {
        this._examService.readAll().subscribe((allExams: ExamDto[]) => {
            this._allExams = allExams;
            this.displayedExams = allExams;
        });
    }

    private _updateExamsList(examDto: ExamDto) {
        this._removeExam(examDto);
        this._allExams.push(examDto);
    }

    private _removeExam(examDto: ExamDto) {
        Util.arrayRemove(this._allExams, (exam: ExamDto) => exam.id == examDto.id);
    }

    public addExam() {
        this._dialogService
            .open(ExamCreateUpdateDialog, this._makeDialogConfig(DialogMode.NEW))
            .afterClosed()
            .first()
            .filter(isTruthy)
            .switchMap((value) => this._examService.create(value))
            .subscribe((examDto: ExamDto) => {
                this._allExams.push(examDto);
                this._notificationService.success('i18n.modules.exam.notification.add.title', 'i18n.modules.exam.notification.add.message');
            });
    }

    public deleteExam(exam: ExamDto) {
        this._confirmDialogService.open('i18n.modules.exam.dialogs.confirmDeleteDialog.title', 'i18n.modules.exam.dialogs.confirmDeleteDialog.message')
            .filter(isTruthy)
            .switchMap(() => this._examService.deleteById(exam.id))
            .subscribe(() => {
                this._notificationService.success('i18n.modules.exam.notification.delete.title', 'i18n.modules.exam.notification.delete.message');
                this._removeExam(exam);
            });
    }

    public editExam(exam: ExamDto) {
        this._dialogService.open(ExamCreateUpdateDialog, this._makeDialogConfig(DialogMode.EDIT, exam))
            .afterClosed()
            .first()
            .filter(isTruthy)
            .switchMap((value) => this._examService.create(value))
            .subscribe((examDto: ExamDto) => {
                this._updateExamsList(examDto);
                this._notificationService.success('i18n.modules.exam.notification.add.title', 'i18n.modules.exam.notification.add.message');
            });
    }

    private _displayForFilter(all: boolean = true) {
        this.displayedExams = all ? this._allExams : this._activeExams;
        this.displayedExams.filter((exam: ExamDto) => {
            let examString = `${exam.name} ${exam.description} ${exam.subjectName}`;
            exam.examTasks.forEach((et: ExamTaskDto) => examString += et.task);
            examString.toLowerCase();
            console.warn(examString);
            this._searchFilter.toLowerCase().split(' ')
                .every((searchTerm: string) => examString.includes(searchTerm));
        });
        this.displayedExams = this._allExams;
        console.error(this.displayedExams);
    }

    private _makeDialogConfig(mode: DialogMode, param: ExamDto = null) {
        return objectAssign(this._responsiveHelper.getMobileOrGivenDialogConfig(MEDIUM_DIALOG), {
            data: {
                mode: mode,
                param: param
            }
        });
    }

    get searchForm(): FormGroup {
        return this._searchForm;
    }
}
