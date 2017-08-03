import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
import {and, isNotEmpty, isTruthy} from '../core/util/helper';
import {Util} from '../core/util/util';
import * as objectAssign from 'object-assign';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SubjectFilterDto} from '../task/model/subject.filter.dto';
import {ActivatedRoute} from '@angular/router';
import {DateUtil} from '../core/services/date-util.service';
import {OCMediaChange} from '../core/services/ui/oc-media-change';
import {Observable} from 'rxjs/Observable';
import {examByNameComparator} from '../core/util/comparator';

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
export class ExamComponent implements OnInit, AfterViewInit {


    private _activeExams: ExamDto[] = [];
    private _allExams: ExamDto[] = [];
    private _displayedExams: ExamDto[] = [];

    private _searchForm: FormGroup;
    private _filterForm: FormGroup;
    private _filterData: SubjectFilterDto;
    private _filterShown: boolean;
    private _today: Date = new Date();

    constructor(private _examService: ExamService,
                private _dialogService: MdDialog,
                private _responsiveHelper: ResponsiveHelperService,
                private _notificationService: NotificationWrapperService,
                private _confirmDialogService: ConfirmDialogService,
                private _formBuilder: FormBuilder,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._initForms();
        this._loadInitialData();
        this._initialFormSubscription();
        this._displayForFilter()
    }

    ngAfterViewInit(): void {
        this._filterShown = !this._responsiveHelper.isMobile();
        Observable.merge(
            this._responsiveHelper.listenForBreakpointChange(),
            this._responsiveHelper.listenForOrientationChange()
        )
            .filter(change => !change.mobile)
            .subscribe((change: OCMediaChange) => this._filterShown = true);
    }

    private _initForms() {
        this._searchForm = this._formBuilder.group({
            searchTerm: ['']
        });
        this._filterForm = this._formBuilder.group({
            subjectId: [''],
            onlyCurrentSemesters: [true],
            onlyUpcoming: [true]
        });
    }

    private _initialFormSubscription() {
        Observable.merge(
            this._searchForm.get('searchTerm').valueChanges
                .debounceTime(300)
                .distinctUntilChanged(),
            this._filterForm.valueChanges
        ).subscribe(this._displayForFilter.bind(this));
    }

    private _loadInitialData() {
        this._route.data.subscribe((data: { taskFilter: SubjectFilterDto, allExams: ExamDto[], activeExams: ExamDto[] }) => {
            this._filterData = data.taskFilter;
            this._activeExams = data.activeExams;
            this._allExams = data.allExams;
            this._sortExams();
            this._displayForFilter();
        });
    }


    private _sortExams() {
        this._allExams.sort(examByNameComparator);
        this._activeExams.sort(examByNameComparator)
    }

    private _updateExamsList(examDto: ExamDto) {
        this._removeExam(examDto);
        this._allExams.push(examDto);
        this._sortExams();
        this._displayForFilter()
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
                        this._sortExams();
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

    private _displayForFilter() {
        let filteredExams: ExamDto[] = !this._filterForm.value.onlyCurrentSemesters ? this._allExams : this._activeExams;
        filteredExams = filteredExams.filter(this._buildFilterPredicate());
        if (isNotEmpty(this.searchTermControl.value)) {
            filteredExams = filteredExams.filter(this._buildSearchPredicate());
        }
        this._displayedExams = filteredExams
    }

    private _buildFilterPredicate(): Predicate<ExamDto> {
        let filterValue = this._filterForm.value;
        let predicates: Array<Predicate<ExamDto>> = [];
        if (filterValue.onlyUpcoming) {
            predicates.push((exam: ExamDto) => DateUtil.isBeforeOrSameDay(this._today, DateUtil.transformToDateIfPossible(exam.date)));
        }
        if (isNotEmpty(filterValue.subjectId)) {
            predicates.push((exam: ExamDto) => exam.subject.id == filterValue.subjectId);
        }
        return and(predicates);
    }

    private _buildSearchPredicate(): Predicate<ExamDto> {
        return (exam) => {
            let examString = `${exam.name} ${exam.description} ${exam.subject.name}`;
            exam.examTasks.forEach((et: ExamTaskDto) => examString += et.task);
            examString = examString.toLowerCase();
            return this.searchTermControl.value.toLowerCase().split(' ')
                .every((searchPart: string) => examString.includes(searchPart))
        }
    }

    public resetFilter() {
        this._searchForm.reset();
        this._filterForm.reset({
            onlyCurrentSemesters: true,
            onlyUpcoming: true
        });
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

    get filterShown(): boolean {
        return this._filterShown;
    }

    get filterForm(): FormGroup {
        return this._filterForm;
    }

    get displayedExams(): ExamDto[] {
        return this._displayedExams
    }

    get filterData(): SubjectFilterDto {
        return this._filterData;
    }

    get searchTermControl(): FormControl {
        return this._searchForm.get('searchTerm') as FormControl;
    }

    public changeFilterVisibility() {
        this._filterShown = !this._filterShown;
    }
}
