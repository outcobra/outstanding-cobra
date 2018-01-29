import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {ManageService} from './service/manage.service';
import {InstitutionDto, ManageDto, SchoolClassDto, SchoolYearDto, SemesterDto, SubjectDto} from './model/manage.dto';
import {MatDialogRef} from '@angular/material';
import {InstitutionDialog} from './institution-dialog/institution-dialog.component';
import {ViewMode} from '../core/common/view-mode';
import {SchoolClassDialog} from './school-class-dialog/school-class-dialog.component';
import {InstitutionService} from './service/institution.service';
import {SchoolClassService} from './service/school-class.service';
import {SchoolYearDialog} from './school-year-dialog/school-year-dialog.component';
import {SchoolYearService} from './service/school-year.service';
import {SemesterDialog} from './semester-dialog/semester-dialog.component';
import {SemesterService} from './service/semester.service';
import {ConfirmDialogService} from '../core/services/confirm-dialog.service';
import {ManageDialogFactory} from './service/manage-dialog-factory';
import {SubjectDialog} from './subject-dialog/subject-dialog.component';
import {SubjectService} from './service/subject.service';
import {Util} from '../core/util/util';
import {equals, isFalsy, isNotNull, isTrue, isTruthy} from '../core/util/helper';
import {Observable} from 'rxjs/Observable';
import {Dto} from '../core/common/dto';
import {CreateUpdateComponent} from '../core/common/create-update-component';
import {ResponsiveHelperService} from '../core/services/ui/responsive-helper.service';
import {ManageView} from './model/manage-view';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

const I18N_PREFIX = 'i18n.modules.manage.mobile.title.';

@Component({
    selector: 'manager',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageComponent implements OnInit, AfterViewInit {
    public readonly manageViewRef = ManageView;

    private _manageData: ManageDto;
    private _currentManageData: Map<number, BehaviorSubject<Array<InstitutionDto | SchoolYearDto | SubjectDto>>> = new Map()
        .set(ManageView.INSTITUTION_CLASS, new BehaviorSubject<Array<InstitutionDto>>(null))
        .set(ManageView.YEAR_SEMESTER, new BehaviorSubject<Array<SchoolYearDto>>(null))
        .set(ManageView.SUBJECT, new BehaviorSubject<Array<SubjectDto>>(null));
    //public currentInstitutions$: BehaviorSubject<Array<InstitutionDto>> = new BehaviorSubject(null);
    //public currentSchoolYears$: BehaviorSubject<Array<SchoolYearDto>> = new BehaviorSubject(null);
    //public currentSubjects$: BehaviorSubject<Array<SubjectDto>> = new BehaviorSubject(null);
    //public currentManageData: Array<Array<InstitutionDto | SchoolYearDto | SubjectDto>> = [];
    private _activeSchoolClassId: number = null;

    private _activeSemesterId: number = null;
    private _institutionDialogRef: MatDialogRef<InstitutionDialog>;
    private _schoolClassDialogRef: MatDialogRef<SchoolClassDialog>;
    private _schoolYearDialogRef: MatDialogRef<SchoolYearDialog>;
    private _semesterDialogRef: MatDialogRef<SemesterDialog>;
    private _subjectDialogRef: MatDialogRef<SubjectDialog>;

    private _activeManageView;
    public marginLeft: number = 0;
    public columnClasses = {};
    public mobileTitle: string;

    constructor(private _manageService: ManageService,
                private _institutionService: InstitutionService,
                private _schoolClassService: SchoolClassService,
                private _schoolYearService: SchoolYearService,
                private _semesterService: SemesterService,
                private _subjectService: SubjectService,
                private _notificationService: NotificationWrapperService,
                private _confirmDialogService: ConfirmDialogService,
                private _manageDialogFactory: ManageDialogFactory,
                private _elementRef: ElementRef,
                private _responsiveHelper: ResponsiveHelperService,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this._prepareManageData();
    }

    ngAfterViewInit() {
        Observable.merge(
            this._responsiveHelper.listenForOrientationChange(),
            this._responsiveHelper.listenForBreakpointChange()
        ).subscribe(() => {
            this.calculateMarginLeftByCurrentView();
            this.setColumnClasses();
            this._changeDetectorRef.markForCheck();
        });

        this._activeManageView = ManageView.INSTITUTION_CLASS;
        this.mobileTitle = I18N_PREFIX + ManageView[this._activeManageView];
        this.setColumnClasses();
        this._changeDetectorRef.detectChanges();
    }

    private calculateMarginLeftByCurrentView() {
        this.marginLeft = -(this._activeManageView * this._elementRef.nativeElement.offsetWidth);
    }

    //region responsive
    public isMobile() {
        return this._responsiveHelper.isMobile();
    }

    private setColumnClasses() {
        this.columnClasses = {
            'col': !this.isMobile(),
            's4': !this.isMobile(),
            'mobile-col': this.isMobile()
        };
    }

    private changeView(next: number) {
        if (this.isValidDirection(next)) {
            this._activeManageView = this._activeManageView + next;
            this.mobileTitle = I18N_PREFIX + ManageView[this._activeManageView];
            this.calculateMarginLeftByCurrentView();
        }
    }

    private lastView() {
        this.changeView(-1);
    }

    private nextView() {
        this.changeView(1);
    }

    private isValidDirection(next: number): boolean {
        let nextView = this._activeManageView + next;
        //noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
        return ManageView[nextView] !== undefined && isNotNull(this._currentManageData.get(nextView).getValue());
    }

    //endregion

    //region helper
    public selectSchoolClass(schoolClassId: number) {
        let schoolClass = this._findSchoolClass(this.currentInstitutions$.getValue(), schoolClassId);
        if (isTruthy(schoolClass)) {
            this.currentSchoolYears$.next(schoolClass.schoolYears ? schoolClass.schoolYears : []);
            this._activeSchoolClassId = schoolClass.id;
            this.currentSubjects$.next(null);
            this._activeSemesterId = null;
        }
        if (this.isMobile()) this.nextView();
    }

    public selectSemester(semesterId: number) {
        let semester = this._findSemester(this.currentSchoolYears$.getValue(), semesterId);
        if (isTruthy(semester)) {
            this.currentSubjects$.next(semester.subjects ? semester.subjects : []);
            this._activeSemesterId = semester.id;
        }
        if (this.isMobile()) this.nextView();
    }

    private _findSemester(schoolYears: SchoolYearDto[], semesterId: number): SemesterDto {
        for (let schoolYear of schoolYears) {
            let semester: SemesterDto = <SemesterDto>schoolYear.semesters.find((semester: SemesterDto) => {
                return semester.id === semesterId;
            });
            if (isTruthy(semester)) return semester;
        }
        return null;
    }

    private _findSchoolClass(institutions: InstitutionDto[], schoolClassId: number): SchoolClassDto {
        for (let institution of institutions) {
            let schoolClass: SchoolClassDto = <SchoolClassDto>institution.schoolClasses.find((schoolClass: SchoolClassDto) => {
                return schoolClass.id === schoolClassId;
            });
            if (isTruthy(schoolClass)) return schoolClass;
        }
        return null;
    }

    private _prepareManageData() {
        this._manageService.getManageData()
            .subscribe((manageData) => {
                this._manageData = manageData;
                this.currentInstitutions$.next(manageData.institutions);

                if (this.activeSchoolClassId) {
                    let schoolYears = this._findSchoolClass(manageData.institutions, this.activeSchoolClassId).schoolYears;
                    this.currentSchoolYears$.next(schoolYears);
                    if (this.activeSemesterId) {
                        this.currentSubjects$.next(this._findSemester(schoolYears, this.activeSemesterId).subjects);
                    }
                }
            });
    }

    //endregion

    //region add
    public addInstitution() {
        this._institutionDialogRef = this._manageDialogFactory.getDialog(InstitutionDialog, ViewMode.NEW, null);
        this._handleAddition('institution', this._institutionDialogRef,
            (institution: InstitutionDto) =>
                this.currentInstitutions$.next(this.currentInstitutions$.getValue().concat(institution))
        );
    }

    public addSchoolClass(institution: InstitutionDto) {
        this._schoolClassDialogRef = this._manageDialogFactory.getDialog(SchoolClassDialog, ViewMode.NEW, institution);
        this._handleAddition('schoolClass', this._schoolClassDialogRef, (schoolClass: SchoolClassDto) => {
            if (isFalsy(institution.schoolClasses)) institution.schoolClasses = [];
            institution.schoolClasses.push(schoolClass);
        });
    }

    public addSchoolYear(schoolClassId: number) {
        if (isTruthy(schoolClassId)) {
            let schoolClass: SchoolClassDto = this._findSchoolClass(this.currentInstitutions$.getValue(), schoolClassId);
            this._schoolYearDialogRef = this._manageDialogFactory.getDialog(SchoolYearDialog, ViewMode.NEW, schoolClass);
            this._handleAddition('schoolYear', this._schoolYearDialogRef,
                (schoolYear: SchoolYearDto) => this.currentSchoolYears$.getValue().push(schoolYear)
            );
        }
    }

    public addSemester(schoolYear: SchoolYearDto) {
        if (isTruthy(schoolYear)) {
            this._semesterDialogRef = this._manageDialogFactory.getDialog(SemesterDialog, ViewMode.NEW, schoolYear);
            this._handleAddition('semester', this._semesterDialogRef,
                (semester: SemesterDto) => {
                    if (isFalsy(schoolYear.semesters)) schoolYear.semesters = [];
                    schoolYear.semesters.push(semester);
                });
        }
    }

    public addSubject(semesterId: number) {
        if (isTruthy(semesterId)) {
            let semester: SemesterDto = this._findSemester(this.currentSchoolYears$.getValue(), semesterId);
            this._subjectDialogRef = this._manageDialogFactory.getDialog(SubjectDialog, ViewMode.NEW, semester);
            this._handleAddition('subject', this._subjectDialogRef,
                (subject: SubjectDto) => this.currentSubjects$.getValue().push(subject)
            );
        }
    }

    //endregion

    //region delete
    public deleteInstitution(toDelete: InstitutionDto) {
        this._handleDeletion(toDelete, 'institution', this._institutionService.deleteById,
            (institution) => {
                Util.removeFirstMatch(this.currentInstitutions$.getValue(), (i) => i.id == institution.id);
                if (institution.schoolClasses.some(clazz => clazz.id === this.activeSchoolClassId)) {
                    this.currentSchoolYears$.next(null);
                    this.currentSubjects$.next(null);
                }
            }, this._institutionService
        );
    }

    public deleteSchoolClass(toDelete: SchoolClassDto) {
        this._handleDeletion(toDelete, 'schoolClass', this._schoolClassService.deleteById, (schoolClass) => {
            let institution = (this.currentInstitutions$.getValue()).find(inst => inst.id === schoolClass.institutionId);
            Util.removeFirstMatch(institution.schoolClasses, (clazz) => clazz.id == schoolClass.id);
            if (this.activeSchoolClassId === schoolClass.id) {
                this.currentSchoolYears$.next(null);
                this.currentSubjects$.next(null);
            }
        }, this._schoolClassService);
    }

    public deleteSchoolYear(toDelete: SchoolYearDto) {
        this._handleDeletion(toDelete, 'schoolYear', this._schoolYearService.deleteById,
            (schoolYear) => {
                Util.removeFirstMatch(this.currentSchoolYears$.getValue(), (year) => year.id == schoolYear.id);
                if (schoolYear.semesters.some(semester => semester.id === this.activeSemesterId)) {
                    this.currentSubjects$.next(null);
                }
            }, this._schoolYearService
        );
    }

    public deleteSemester(toDelete: SemesterDto) {
        this._handleDeletion(toDelete, 'semester', this._semesterService.deleteById, (semester) => {
            let schoolYear = (this.currentSchoolYears$.getValue()).find(year => year.id === semester.schoolYearId);
            Util.removeFirstMatch(schoolYear.semesters, (sem) => sem.id == semester.id);
            if (semester.id === this.activeSemesterId) {
                this.currentSubjects$.next(null);
            }
        }, this._semesterService);
    }

    public deleteSubject(toDelete: SubjectDto) {
        this._handleDeletion(toDelete, 'subject', this._subjectService.deleteById,
            (subject) => Util.removeFirstMatch(this.currentSubjects$.getValue(), (sub) => sub.id == subject.id),
            this._subjectService);
    }

    //endregion

    //region edit
    public editInstitution(toEdit: InstitutionDto) {
        let dialog = this._manageDialogFactory.getDialog(InstitutionDialog, ViewMode.EDIT, null, null, toEdit);
        this._handleEdit('institution', dialog);
    }

    public editSchoolClass(toEdit: SchoolClassDto) {
        let parent = (this.currentInstitutions$.getValue())
            .find(institution => institution.id === toEdit.institutionId);
        let dialog = this._manageDialogFactory.getDialog(SchoolClassDialog, ViewMode.EDIT, parent, null, toEdit);
        this._handleEdit('schoolClass', dialog);
    }

    public editSchoolYear(toEdit: SchoolYearDto) {
        let parent = this._findSchoolClass(this.currentInstitutions$.getValue(), toEdit.id);
        let dialog = this._manageDialogFactory.getDialog(SchoolYearDialog, ViewMode.EDIT, parent, null, toEdit);
        this._handleEdit('schoolYear', dialog);
    }

    public editSemester(toEdit: SemesterDto) {
        let parent = this.currentSchoolYears$.getValue().find(year => equals(year.id, toEdit.schoolYearId));
        let dialog = this._manageDialogFactory.getDialog(SemesterDialog, ViewMode.EDIT, parent, null, toEdit);
        this._handleEdit('semester', dialog);
    }

    public editSubject(toEdit: SubjectDto) {
        let parent: SemesterDto = this._findSemester(this.currentSchoolYears$.getValue(), toEdit.semesterId);
        let dialog = this._manageDialogFactory.getDialog(SubjectDialog, ViewMode.EDIT, parent, null, toEdit);
        this._handleEdit('subject', dialog);
    }

    //endregion

    //region handler
    /**
     * opens the deleteConfirmationDialog with for the given entityName
     * then filters the resulting Observable so that the deletion is only made when the result of the dialog is true
     * performs a switchMap on the deleteFunction which must return an Observable and then executes the finishFunction when a value is emitted by the switched Observable
     *
     * finally it marks the component for checks
     *
     * shows an error when the entity could not have been deleted
     *
     * @param entity toDelete must be a Dto
     * @param entityName name for i18n and deleteConfirmationDialog
     * @param deleteFunction function that is used to delete the entity
     * @param finishFunction function to execute on delete success
     * @param thisArg the scope where the createFunction should be run on
     */
    private _handleDeletion<T extends Dto>(entity: T, entityName: string, deleteFunction: (id: number) => Observable<any>, finishFunction: (entity: T) => void, thisArg: any) {
        this._openDeleteConfirmDialog(entityName)
            .filter(isTrue)
            .switchMap(() => deleteFunction.call(thisArg, entity.id))
            .catch(() => {
                this._notificationService.remove();
                this._showDeleteErrorNotification(entityName);
                return Observable.empty();
            })
            .finally(() => this._changeDetectorRef.markForCheck())
            .subscribe(() => {
                this._showDeleteSuccessNotification(entityName);
                finishFunction(entity);
            });
    }

    /**
     * waits for emitted values from the given dialog
     *
     * checks that the emitted values are not null or something similar {@see isTruthy}
     * calls the finish function with the emitted value
     * and shows a success notification
     * finally it marks the component for checks
     *
     * @param entityName name for i18n and deleteConfirmationDialog
     * @param dialogRef to listen for close event
     * @param finishFunction function to execute on create success
     */
    private _handleAddition<T extends Dto, D extends CreateUpdateComponent<T>>(entityName: string, dialogRef: MatDialogRef<D>, finishFunction: (entity: T) => void) {
        dialogRef.afterClosed()
            .filter(isTruthy)
            .finally(() => this._changeDetectorRef.markForCheck())
            .subscribe((entity: T) => {
                this._showSaveSuccessNotification(entityName);
                finishFunction(entity);
            });
    }

    /**
     * waits for emitted values from the given dialog
     *
     * checks that the emitted values are not null or something similar {@see isTruthy}
     * also shows a success notification
     *
     * finally it marks the component for checks
     *
     * @param entityName name success message
     * @param dialogRef to listen for close event
     */
    private _handleEdit<T extends Dto, D extends CreateUpdateComponent<T>>(entityName: string, dialogRef: MatDialogRef<D>) {
        dialogRef.afterClosed()
            .filter(isTruthy)
            .catch(() => {
                this._prepareManageData();
                return Observable.empty();
            })
            .finally(() => this._changeDetectorRef.markForCheck())
            .subscribe(() => this._showSaveSuccessNotification(entityName));
    }

    //endregion

    private _openDeleteConfirmDialog(moduleName: string) {
        return this._confirmDialogService.open('i18n.modules.manage.assureDeletion', `i18n.modules.manage.${moduleName}.confirmDeleteMessage`);
    }

    private _showSaveSuccessNotification(entity: string) {
        this._notificationService.success('i18n.common.notification.success.save', `i18n.modules.manage.${entity}.notificationMessage.saveSuccess`);
    }

    private _showDeleteSuccessNotification(entity: string) {
        this._notificationService.success('i18n.common.notification.success.delete', `i18n.modules.manage.${entity}.notificationMessage.deleteSuccess`);
    }

    private _showDeleteErrorNotification(entity: string) {
        this._notificationService.error('i18n.common.notification.error.delete', `i18n.modules.manage.${entity}.notificationMessage.deleteFailed`);
    }

    get activeSchoolClassId(): number {
        return this._activeSchoolClassId;
    }

    get activeSemesterId(): number {
        return this._activeSemesterId;
    }

    get currentInstitutions$(): BehaviorSubject<Array<InstitutionDto>> {
        return this._currentManageData.get(ManageView.INSTITUTION_CLASS) as BehaviorSubject<Array<InstitutionDto>>;
    }

    get currentSchoolYears$(): BehaviorSubject<Array<SchoolYearDto>> {
        return this._currentManageData.get(ManageView.YEAR_SEMESTER) as BehaviorSubject<Array<SchoolYearDto>>;
    }

    get currentSubjects$(): BehaviorSubject<Array<SubjectDto>> {
        return this._currentManageData.get(ManageView.SUBJECT) as BehaviorSubject<Array<SubjectDto>>;
    }
}
