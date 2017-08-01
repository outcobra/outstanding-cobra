import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExamService} from './service/exam.service';
import {ExamDto} from './model/exam.dto';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';
import {ExamTaskDto} from './model/exam.task.dto';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ExamCreateUpdateDialog} from './create-update-dialog/exam-create-update-dialog.component';
import {MdDialog} from '@angular/material';
import {ResponsiveHelperService} from '../core/services/ui/responsive-helper.service';
import {DialogMode} from '../core/common/dialog-mode';
import {MEDIUM_DIALOG} from '../core/util/const';
import {ConfirmDialogService} from '../core/services/confirm-dialog.service';
import {isTruthy} from '../core/util/helper';
import {Util} from '../core/util/util';
import * as objectAssign from 'object-assign';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FilterService} from '../core/services/filter/filter.service';
import {SubjectFilterDto} from '../task/model/subject.filter.dto';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('filterShown', [
            state('1', style({
                height: '*',
                paddingTop: '*',
                paddingBottom: '*'
            })),
            state('0', style({
                height: '0',
                paddingTop: '0',
                paddingBottom: '0'
            })),
            transition('1 => 0', animate('250ms ease-in')),
            transition('0 => 1', animate('250ms ease-out'))
        ])
    ]
})
export class ExamComponent implements OnInit {

    private _activeExams: ExamDto[] = [];
    private _allExams: ExamDto[] = [];
    private displayedExams: ExamDto[] = [];

    private _searchForm: FormGroup;
    private _filterForm: FormGroup;
    private _filterData: SubjectFilterDto;

    constructor(private _examService: ExamService,
                private _filterService: FilterService,
                private _dialogService: MdDialog,
                private _responsiveHelper: ResponsiveHelperService,
                private _notificationService: NotificationWrapperService,
                private _confirmDialogService: ConfirmDialogService,
                private _formBuilder: FormBuilder,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._initForms();
        this._loadInitialData()
        this._initialFromSubscription()
        this._displayForFilter()
    }

    private _initForms() {
        this._searchForm = this._formBuilder.group({
            searchTerm: ['']
        })
        this._filterForm = this._formBuilder.group({
            subjectId: [''],
            onlyCurrentSemesters: [true],
            onlyUpcoming: [true]
        })
    }

    private _initialFromSubscription() {
        this._searchForm.get('searchTerm').valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe((searchTerm: string) => this._displayForFilter(searchTerm));

        this._filterForm.valueChanges.subscribe(() => this._displayForFilter(this.searchTermControl.value))
    }

    private _loadInitialData() {

        this._route.data.subscribe((data: { taskFilter: SubjectFilterDto }) => {
            this._filterData = data.taskFilter;
            console.warn(data.taskFilter)
        });

        this._examService.readAll().subscribe((allExams: ExamDto[]) => {
            this._allExams = allExams;
            this.displayedExams = allExams;
            this._sortExams()
        });

        this._examService.readAllActive().subscribe((activeExams: ExamDto[]) => {
            this._activeExams = activeExams;
        });


    }


    private _sortExams() {
        let sortFunction = function (currentExam: ExamDto, comparedToExam: ExamDto) {
            let currentName = currentExam.name.toLowerCase()
            let comparedToName = comparedToExam.name.toLowerCase()
            if (currentName == comparedToName) {
                return 0
            } else if (currentName > comparedToName) {
                return 1
            }
            return -1
        }
        this._allExams.sort(sortFunction)
        this._activeExams.sort(sortFunction)
    }

    private _updateExamsList(examDto: ExamDto) {
        this._removeExam(examDto);
        this._allExams.push(examDto);
        this._sortExams()
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
            .subscribe((incompleteExam: ExamDto) => {
                //workaround for backend bug don't remove it
                this._examService.readById(incompleteExam.id)
                    .subscribe((completeExam: ExamDto) => {
                        this._allExams.push(completeExam);
                        this._sortExams()
                        this._notificationService.success('i18n.modules.exam.notification.add.title', 'i18n.modules.exam.notification.add.message');
                    });
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
            .subscribe((incompleteExam: ExamDto) => {
                //workaround for backend bug don't remove it
                this._examService.readById(incompleteExam.id)
                    .subscribe((completeExam: ExamDto) => {
                        this._updateExamsList(completeExam);
                        this._notificationService.success('i18n.modules.exam.notification.update.title', 'i18n.modules.exam.notification.update.message');
                    });
            });

    }

    private _displayForFilter(searchTerm: string = '') {
        let filterValue = this.filterForm.value
        this.displayedExams = !filterValue.onlyCurrentSemesters ? this._allExams : this._activeExams;
        if (searchTerm != '') {
            this.displayedExams = this.displayedExams.filter((exam: ExamDto) => {
                let examString = `${exam.name} ${exam.description} ${exam.subject.name}`;
                exam.examTasks.forEach((et: ExamTaskDto) => examString += et.task);
                examString.toLowerCase();
                console.warn(examString);
                searchTerm.toLowerCase().split(' ')
                    .every((searchTerm: string) => examString.includes(searchTerm));
            });
        }
    }

    public resetFilter() {
        this._initForms()
        this.searchTermControl.setValue('')
        this._displayForFilter()
        console.warn('reset')
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

    get filterForm(): FormGroup {
        return this._filterForm;
    }


    get filterData(): SubjectFilterDto {
        return this._filterData;
    }

    get searchTermControl(): FormControl {
        return this._searchForm.get('searchTerm') as FormControl;
    }
}
