import {Component, OnInit} from '@angular/core';
import {ExamService} from './service/exam.service';
import {ExamDto} from './model/exam.dto';
import {ActivatedRoute} from '@angular/router';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';
import {ExamTaskDto} from './model/exam.task.dto';
import {FormControl, FormGroup} from '@angular/forms';
import {ExamCreateUpdateDialog} from './create-update-dialog/exam-create-update-dialog.component';
import {MdDialog, MdDialogRef} from '@angular/material';
import {ResponsiveHelperService} from '../core/services/ui/responsive-helper.service';
import {DialogMode} from '../core/common/dialog-mode';
import {MEDIUM_DIALOG, SMALL_DIALOG} from '../core/util/const';
import {ConfirmDialogService} from '../core/services/confirm-dialog.service';
import {isFalsy, isTruthy} from '../core/util/helper';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {

    private _activeExams: ExamDto[] = [];
    private _allExams: ExamDto[] = []
    private displayedExams: ExamDto[] = []
    private _exam: ExamDto

    private _searchFilter: string = ""
    private _searchForm: FormGroup

    private _createUpdateExamDialog: MdDialogRef<ExamCreateUpdateDialog>

    constructor(private _examService: ExamService,
                private _route: ActivatedRoute,
                private _dialogService: MdDialog,
                private _responsiveHelper: ResponsiveHelperService,
                private _notificationService: NotificationWrapperService,
                private _confirmDialogService: ConfirmDialogService) {
    }


    ngOnInit() {
        this._searchForm = new FormGroup({
            searchTerm: new FormControl()
        })
        this._loadActiveExams()
        this._loadAllExams()
        //this._displayForFilter()
    }

    private _loadActiveExams() {
        this._examService.readAllActive().subscribe((activeExams: ExamDto[]) => {
            this._activeExams = activeExams;
        })
    }

    private _loadAllExams() {
        this._examService.readAll().subscribe((allExams: ExamDto[]) => {
            this._allExams = allExams
            this.displayedExams = allExams
        })
    }

    public addExam() {
        this._createUpdateExamDialog = this._dialogService
            .open(ExamCreateUpdateDialog, this._responsiveHelper.getMobileOrGivenDialogConfig(SMALL_DIALOG))
        this._createUpdateExamDialog.componentInstance.init(DialogMode.NEW, null)
        this._createUpdateExamDialog.afterClosed().flatMap((value) => {
            if (isFalsy(value)) return Observable.empty();
            return this._examService.create(value)
        })
            .subscribe((examDto: ExamDto) => {
                this._allExams.push(examDto)
                this._notificationService.success('Created', 'Success')
            })
    }

    public deleteExam(exam: ExamDto) {
        this._confirmDialogService.open('i18n.modules.exam.dialogs.confirmDeleteDialog.title', 'i18n.modules.exam.dialogs.confirmDeleteDialog.message')
            .subscribe((deletionConfirmed: boolean) => {
                if (deletionConfirmed) {
                    this._examService.deleteById(exam.id).subscribe((result: any) => {
                        if (isTruthy(result)) {
                            this._notificationService.success('Deleted', 'Success')
                        } else {
                            this._notificationService.error('Fail', 'Error')
                        }
                    })
                } else {
                    this._notificationService.alert('Cancel', 'Alert')
                }
            })
    }

    public editExam(exam: ExamDto) {
        this._createUpdateExamDialog = this._dialogService
            .open(ExamCreateUpdateDialog, this._responsiveHelper.getMobileOrGivenDialogConfig(MEDIUM_DIALOG))
        this._createUpdateExamDialog.componentInstance.init(DialogMode.EDIT, exam)
        this._createUpdateExamDialog.afterClosed().flatMap((value) => {
            return Observable.empty()
        });
    }

    private _displayForFilter(all: boolean = true) {
        this.displayedExams = all ? this._allExams : this._activeExams
        this.displayedExams.filter((exam: ExamDto) => {
            let examString = `${exam.name} ${exam.description} ${exam.subjectName}`
            exam.examTasks.forEach((et: ExamTaskDto) => examString += et.task)
            examString.toLowerCase()
            console.warn(examString)
            this._searchFilter.toLowerCase().split(' ')
                .every((searchTerm: string) => examString.includes(searchTerm))
        })
        this.displayedExams = this._allExams
        console.error(this.displayedExams)
    }

    get searchForm(): FormGroup {
        return this._searchForm;
    }
}
