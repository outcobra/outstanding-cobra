import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {ManageService} from './service/manage.service';
import {InstitutionDto, ManageDto, SchoolClassDto, SchoolYearDto, SemesterDto, SubjectDto} from './model/ManageDto';
import {MdDialogRef} from '@angular/material';
import {InstitutionDialog} from './institution-dialog/institution-dialog.component';
import {DialogMode} from '../common/DialogMode';
import {SchoolClassDialog} from './school-class-dialog/school-class-dialog.component';
import {InstitutionService} from './service/institution.service';
import {SchoolClassService} from './service/school-class.service';
import {SchoolYearDialog} from './school-year-dialog/school-year-dialog.component';
import {SchoolYearService} from './service/school-year.service';
import {SemesterDialog} from './semester-dialog/semester-dialog.component';
import {SemesterService} from './service/semester.service';
import {NotificationsService} from 'angular2-notifications';
import {ConfirmDialogService} from '../shared/services/confirm-dialog.service';
import {ManageDialogFactory} from './service/manage-dialog-factory';
import {SubjectDialog} from './subject-dialog/subject-dialog.component';
import {SubjectService} from './service/subject.service';
import {Util} from '../shared/util/util';
import {isNotNull, isNull, isTrue} from '../shared/util/helper';
import {Observable} from 'rxjs';
import {Dto} from '../common/Dto';
import {CreateUpdateDialog} from '../common/CreateUpdateDialog';
import {ResponsiveHelperService} from '../shared/services/ui/responsive-helper.service';
import {ManageView} from './model/ManageView';

const I18N_PREFIX = 'i18n.modules.manage.mobile.title.';

@Component({
    selector: 'manager',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManageComponent implements OnInit, AfterViewInit {
    public readonly manageViewRef = ManageView;

    private _manageData: ManageDto;
    public currentManageData: Array<Array<InstitutionDto | SchoolYearDto | SubjectDto>> = [];
    private _activeSchoolClassId: number = null;

    private _activeSemesterId: number = null;
    private _institutionDialogRef: MdDialogRef<InstitutionDialog>;
    private _schoolClassDialogRef: MdDialogRef<SchoolClassDialog>;
    private _schoolYearDialogRef: MdDialogRef<SchoolYearDialog>;
    private _semesterDialogRef: MdDialogRef<SemesterDialog>;
    private _subjectDialogRef: MdDialogRef<SubjectDialog>;

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
                private _notificationService: NotificationsService,
                private _confirmDialogService: ConfirmDialogService,
                private _manageDialogFactory: ManageDialogFactory,
                private _elementRef: ElementRef,
                private _responsiveHelper: ResponsiveHelperService) {
    }

    ngOnInit() {
        this._manageService.getManageData()
            .subscribe((res) => this._prepareManageData(res));
    }

    ngAfterViewInit() {
        this._responsiveHelper.listenForOrientationChange().subscribe(() => this.calculateMarginLeftByCurrentView());
        this._responsiveHelper.listenForResize().subscribe(() => {
            this.calculateMarginLeftByCurrentView();
            this.setColumnClasses();
        });

        this._activeManageView = ManageView.INSTITUTION_CLASS;
        this.mobileTitle = I18N_PREFIX + ManageView[this._activeManageView];
        this.setColumnClasses();
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
        return ManageView[nextView] !== undefined && isNotNull(this.currentManageData[nextView]);
    }

    //endregion

    //region helper
    public selectSchoolClass(schoolClassId: number) {
        let schoolClass = this._findSchoolClass(this.currentManageData[ManageView.INSTITUTION_CLASS] as InstitutionDto[], schoolClassId);
        if (isNotNull(schoolClass)) {
            this.currentManageData[ManageView.YEAR_SEMESTER] = schoolClass.schoolYears ? schoolClass.schoolYears : [];
            this._activeSchoolClassId = schoolClass.id;
            this._activeSemesterId = this.currentManageData[ManageView.SUBJECT] = null;
        }
        if (this.isMobile()) this.nextView();
    }

    public selectSemester(semesterId: number) {
        let semester = this._findSemester(this.currentManageData[ManageView.YEAR_SEMESTER] as SchoolYearDto[], semesterId);
        if (isNotNull(semester)) {
            this.currentManageData[ManageView.SUBJECT] = semester.subjects ? semester.subjects : [];
            this._activeSemesterId = semester.id;
        }
        if (this.isMobile()) this.nextView();
    }

    private _findSemester(schoolYears: SchoolYearDto[], semesterId: number): SemesterDto {
        for (let schoolYear of schoolYears) {
            let semester: SemesterDto = <SemesterDto>schoolYear.semesters.find((semester: SemesterDto) => {
                return semester.id === semesterId;
            });
            if (isNotNull(semester)) return semester;
        }
        return null;
    }

    private _findSchoolClass(institutions: InstitutionDto[], schoolClassId: number): SchoolClassDto {
        for (let institution of institutions) {
            let schoolClass: SchoolClassDto = <SchoolClassDto>institution.schoolClasses.find((schoolClass: SchoolClassDto) => {
                return schoolClass.id === schoolClassId;
            });
            if (isNotNull(schoolClass)) return schoolClass;
        }
        return null;
    }

    private _prepareManageData(manageData: ManageDto) {
        this._manageData = manageData;
        this.currentManageData[ManageView.INSTITUTION_CLASS] = manageData.institutions;
    }

    //endregion

    //region add
    public addInstitution() {
        this._institutionDialogRef = this._manageDialogFactory.getDialog(InstitutionDialog, DialogMode.NEW, null);
        this._handleAddition<InstitutionDto, InstitutionDialog>('institution', this._institutionDialogRef, this._institutionService.create,
            (institution: InstitutionDto) => this.currentManageData[ManageView.INSTITUTION_CLASS].push(institution), this._institutionService
        );
    }

    public addSchoolClass(institution: InstitutionDto) {
        this._schoolClassDialogRef = this._manageDialogFactory.getDialog(SchoolClassDialog, DialogMode.NEW, institution);
        this._handleAddition<SchoolClassDto, SchoolClassDialog>('schoolClass', this._schoolClassDialogRef, this._schoolClassService.create,
            (schoolClass: SchoolClassDto) => {
                if (isNull(institution.schoolClasses)) institution.schoolClasses = [];
                institution.schoolClasses.push(schoolClass);
            }, this._schoolClassService);
    }

    public addSchoolYear(schoolClassId: number) {
        if (isNotNull(schoolClassId)) {
            let schoolClass: SchoolClassDto = this._findSchoolClass(this.currentManageData[ManageView.INSTITUTION_CLASS] as InstitutionDto[], schoolClassId);
            this._schoolYearDialogRef = this._manageDialogFactory.getDialog(SchoolYearDialog, DialogMode.NEW, schoolClass);
            this._handleAddition<SchoolYearDto, SchoolYearDialog>('schoolYear', this._schoolYearDialogRef, this._schoolYearService.create,
                (schoolYear: SchoolYearDto) => this.currentManageData[ManageView.YEAR_SEMESTER].push(schoolYear), this._schoolYearService
            );
        }
    }

    public addSemester(schoolYear: SchoolYearDto) {
        if (isNotNull(schoolYear)) {
            this._semesterDialogRef = this._manageDialogFactory.getDialog(SemesterDialog, DialogMode.NEW, schoolYear);
            this._handleAddition<SemesterDto, SemesterDialog>('semester', this._semesterDialogRef, this._semesterService.create,
                (semester: SemesterDto) => {
                    if (isNull(schoolYear.semesters)) schoolYear.semesters = [];
                    schoolYear.semesters.push(semester);
                }, this._semesterService);
        }
    }

    public addSubject(semesterId: number) {
        if (isNotNull(semesterId)) {
            let semester: SemesterDto = this._findSemester(this.currentManageData[ManageView.YEAR_SEMESTER] as SchoolYearDto[], semesterId);
            this._subjectDialogRef = this._manageDialogFactory.getDialog(SubjectDialog, DialogMode.NEW, semester);
            this._handleAddition<SubjectDto, SubjectDialog>('subject', this._subjectDialogRef, this._subjectService.create,
                (subject: SubjectDto) => this.currentManageData[ManageView.SUBJECT].push(subject), this._subjectService
            );
        }
    }

    //endregion

    //region delete
    public deleteInstitution(toDelete: InstitutionDto) {
        this._handleDeletion(toDelete, 'institution', this._institutionService.deleteById,
            (institution) => Util.arrayRemove(this.currentManageData[ManageView.INSTITUTION_CLASS], (i) => i.id == institution.id),
            this._institutionService
        );
    }

    public deleteSchoolClass(toDelete: SchoolClassDto) {
        this._handleDeletion(toDelete, 'schoolClass', this._schoolClassService.deleteById, (schoolClass) => {
            let institution = (this.currentManageData[ManageView.INSTITUTION_CLASS] as InstitutionDto[]).find(inst => inst.id === schoolClass.institutionId);
            Util.arrayRemove(institution.schoolClasses, (clazz) => clazz.id == schoolClass.id);
        }, this._schoolClassService);
    }

    public deleteSchoolYear(toDelete: SchoolYearDto) {
        this._handleDeletion(toDelete, 'schoolYear', this._schoolYearService.deleteById,
            (schoolYear) => Util.arrayRemove(this.currentManageData[ManageView.YEAR_SEMESTER], (year) => year.id == schoolYear.id),
            this._schoolYearService
        );
    }

    public deleteSemester(toDelete: SemesterDto) {
        this._handleDeletion(toDelete, 'semester', this._semesterService.deleteById, (semester) => {
            let schoolYear = (this.currentManageData[ManageView.YEAR_SEMESTER] as SchoolYearDto[]).find(year => year.id === semester.schoolYearId);
            Util.arrayRemove(schoolYear.semesters, (sem) => sem.id == semester.id);
        }, this._semesterService);
    }

    public deleteSubject(toDelete: SubjectDto) {
        this._handleDeletion(toDelete, 'subject', this._subjectService.deleteById,
            (subject) => Util.arrayRemove(this.currentManageData[ManageView.SUBJECT], (sub) => sub.id == subject.id),
            this._subjectService
        );
    }

    //endregion

    //region edit
    public editInstitution(toEdit: InstitutionDto) {
        let dialog = this._manageDialogFactory.getDialog(InstitutionDialog, DialogMode.EDIT, null, null, toEdit)
        this._handleEdit('institution', dialog, this._institutionService.update, this._institutionService);
    }

    public editSchoolClass(toEdit: SchoolClassDto) {
        let parent = (this.currentManageData[ ManageView.INSTITUTION_CLASS ] as InstitutionDto[])
            .find(institution => institution.id === toEdit.institutionId);
        let dialog = this._manageDialogFactory.getDialog(SchoolClassDialog, DialogMode.EDIT, parent, null, toEdit);
        this._handleEdit('schoolClass', dialog, this._schoolClassService.update, this._schoolClassService);
    }

    public editSchoolYear(toEdit: SchoolYearDto) {
        let institutions = this.currentManageData[ ManageView.INSTITUTION_CLASS ] as InstitutionDto[];
        let parent = this._findSchoolClass(institutions, toEdit.schoolClassId);
        let dialog = this._manageDialogFactory.getDialog(SchoolYearDialog, DialogMode.EDIT, parent, null, toEdit);
        this._handleEdit('schoolYear', dialog, this._schoolYearService.update, this._schoolYearService);

    }

    public editSemester(toEdit: SemesterDto) {
        let parent = (this.currentManageData[ ManageView.YEAR_SEMESTER ] as SchoolYearDto[])
            .find(year => year.id === toEdit.schoolYearId);
        let dialog = this._manageDialogFactory.getDialog(SemesterDialog, DialogMode.EDIT, parent, null, toEdit);
        this._handleEdit('semester', dialog, this._semesterService.update, this._semesterService);
        // (this.currentManageData[ManageView.YEAR_SEMESTER] as SchoolYearDto[]).forEach(function (value) {
        //     (value as SchoolYearDto).semesters.forEach(function (a) {
        //       console.log(a.name)
        //   });
        // })
    }

    public editSubject(toEdit: SubjectDto) {
        let years = this.currentManageData[ ManageView.YEAR_SEMESTER ] as SchoolYearDto[];
        let parent = this._findSemester(years, toEdit.semesterId);
        let dialog = this._manageDialogFactory.getDialog(SubjectDialog, DialogMode.EDIT, parent, null, toEdit);
        this._handleEdit('subject', dialog, this._subjectService.update, this._subjectService);
    }

    //endregion

    //region handler
    /**
     * opens the deleteConfirmationDialog with for the given entityName
     * then filters the resulting Observable so that the deletion is only made when the result of the dialog is true
     * performs a switchMap on the deleteFunction which must return an Observable and then executes the finishFunction when a value is emitted by the switched Observable
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
            .switchMap(() => Util.bindAndCall(deleteFunction, thisArg, entity.id))
            .catch((error) => {
                this._notificationService.remove();
                this._notificationService.error('i18n.modules.task.notification.error.deleteFailed.title', 'i18n.modules.task.notification.error.deleteFailed.message');
                return Observable.empty();
            })
            .subscribe(() => {
                this._showDeleteSuccessNotification(entityName);
                finishFunction(entity);
            });
    }

    /**
     * waits for emitted values from the given dialog
     *
     * checks that the emitted values are not null or something similar {@see isNotNull}
     * performs a flatMap on the switchFunction which must return an Observable of the entity Type
     * and then executes the finishFunction when a value is emitted by the switched Observable
     * also shows a success notification before executing the finishFunction
     *
     *
     * @param entityName name for i18n and deleteConfirmationDialog
     * @param dialogRef to listen for close event
     * @param createFunction function which creates an entity
     * @param finishFunction function to execute on create success
     * @param thisArg the scope where the createFunction should be run on
     */
    private _handleAddition<T extends Dto, D extends CreateUpdateDialog<T>>(entityName: string, dialogRef: MdDialogRef<D>, createFunction: (entity: T) => Observable<T>, finishFunction: (entity: T) => void, thisArg: any) {
        dialogRef.afterClosed()
            .filter(isNotNull)
            .flatMap((value: T) => Util.bindAndCall(createFunction, thisArg, value))
            .subscribe((entity: T) => {
                this._showSaveSuccessNotification(entityName);
                finishFunction(entity);
            });
    }

    private _handleEdit<T extends Dto, D extends CreateUpdateDialog<T>>(entityName: string, dialogRef: MdDialogRef<D>, editFunction: (entity: T) => Observable<T>, thisArg: any) {
        dialogRef.afterClosed()
            .filter(isNotNull)
            .flatMap((value: T) => Util.bindAndCall(editFunction, thisArg, value))
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

    get activeSchoolClassId(): number {
        return this._activeSchoolClassId;
    }

    get activeSemesterId(): number {
        return this._activeSemesterId;
    }
}
