import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExamService} from './service/exam.service';
import {ExamDto} from './model/exam.dto';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';
import {ExamTaskDto} from './model/exam.task.dto';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ExamCreateUpdateComponent} from './exam-create-update/exam-create-update.component';
import {MatDialog} from '@angular/material';
import {ResponsiveHelperService} from '../core/services/ui/responsive-helper.service';
import {MEDIUM_DIALOG} from '../core/util/const';
import {ConfirmDialogService} from '../core/services/confirm-dialog.service';
import {and, isNotEmpty, isTruthy} from '../core/util/helper';
import {Util} from '../core/util/util';
import * as objectAssign from 'object-assign';
import {SubjectFilterDto} from '../task/model/subject.filter.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {DateUtil} from '../core/services/date-util.service';
import {Observable} from 'rxjs/Observable';
import {examByNameComparator} from '../core/util/comparator';
import {Subject} from 'rxjs/Subject';
import {MarkService} from 'app/mark/service/mark.service';
import {ViewMode} from '../core/common/view-mode';
import {slideUpDownAnimation} from '../core/animations/animations';
import * as moment from 'moment';
import {Moment} from 'moment';

@Component({
    selector: 'exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [slideUpDownAnimation]
})
export class ExamComponent implements OnInit, AfterViewInit {


    private _activeExams: ExamDto[] = [];
    private _allExams: ExamDto[] = [];
    private _displayedExams: ExamDto[] = [];

    private _currentSearchTerm: string;
    private _filterForm: FormGroup;
    private _filterData: SubjectFilterDto;
    private _filterShown: boolean;
    private _today: Moment = moment();

    public addMark$: Subject<ExamDto> = new Subject();

    public selectFilter = {
        upcoming: {
            displayName: 'i18n.modules.exam.filter.showPending',
            filter: (exam: ExamDto) => DateUtil.isBeforeOrSameDay(this._today, DateUtil.transformToMomentIfPossible(exam.date))
        },
        currentSemester: {
            displayName: 'i18n.modules.exam.filter.activeSemesters',
            filter: (exam: ExamDto) => this._activeExams.some(ex => ex.id == exam.id)
        }
    };

    constructor(private _examService: ExamService,
                private _markService: MarkService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _dialogService: MatDialog,
                private _responsiveHelper: ResponsiveHelperService,
                private _notificationService: NotificationWrapperService,
                private _confirmDialogService: ConfirmDialogService,
                private _formBuilder: FormBuilder,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this._initForms();
        this._loadInitialData();
        this._displayForFilter();

        this.addMark$
            .subscribe(exam => {
                this._markService.getMarkGroupBySubjectId(exam.subject.id)
                    .subscribe(subjectGroup =>
                        this._router.navigate([`/mark/semester/${exam.subject.semesterId}/subject/${exam.subject.id}/group/${subjectGroup.id}/add`],
                            {queryParams: {examId: exam.id, examName: exam.name}}) // TODO replace this with stepper components for choosing markgroups etc. (waiting for angular/material2)
                    );
            });
    }

    ngAfterViewInit(): void {
        this._filterShown = !this._responsiveHelper.isMobile();
        Observable.merge(
            this._responsiveHelper.listenForBreakpointChange(),
            this._responsiveHelper.listenForOrientationChange()
        )
            .filter(change => !change.mobile)
            .subscribe(() => this._filterShown = true);
        this._changeDetectorRef.detectChanges();
    }

    private _initForms() {
        this._filterForm = this._formBuilder.group({
            subjectId: [''],
            selectFilter: [[]]
        });
        this._filterForm.valueChanges.subscribe(() => this._displayForFilter());
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
        Util.removeFirstMatch(this._allExams, (exam: ExamDto) => exam.id == examDto.id);
    }

    public addExam() {
        this._router.navigateByUrl('/exam/new');
        /*this._dialogService
            .open(ExamCreateUpdateComponent, this._makeDialogConfig(ViewMode.NEW))
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
                        this._displayForFilter();
                        this._notificationService.success('i18n.modules.exam.notification.add.title', 'i18n.modules.exam.notification.add.message');
                    });
            });*/
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
        this._dialogService.open(ExamCreateUpdateComponent, this._makeDialogConfig(ViewMode.EDIT, exam))
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

    public search(searchStr: string) {
        this._currentSearchTerm = searchStr;
        this._displayForFilter();
    }

    private _displayForFilter() {
        let filteredExams = this._allExams.filter(this._buildFilterPredicate());
        if (isNotEmpty(this._currentSearchTerm)) {
            filteredExams = filteredExams.filter(this._buildSearchPredicate());
        }
        this._displayedExams = filteredExams
    }

    private _buildFilterPredicate(): Predicate<ExamDto> {
        let filterValue = this._filterForm.value;
        let predicates: Array<Predicate<ExamDto>> = filterValue.selectFilter.map(value => this.selectFilter[value].filter);
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
            return this._currentSearchTerm.toLowerCase().split(' ')
                .every((searchPart: string) => examString.includes(searchPart))
        }
    }

    private _makeDialogConfig(mode: ViewMode, param: ExamDto = null) {
        return objectAssign(this._responsiveHelper.getMobileOrGivenDialogConfig(MEDIUM_DIALOG), {
            data: {
                mode: mode,
                param: param
            }
        });
    }

    get allExams(): ExamDto[] {
        return this._allExams;
    }

    public getSelectFilterKeys() {
        return Object.keys(this.selectFilter);
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
}
