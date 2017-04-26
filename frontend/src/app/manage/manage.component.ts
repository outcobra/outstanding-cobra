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

    private manageData: ManageDto;
    public currentManageData: Array<Array<InstitutionDto|SchoolYearDto|SubjectDto>> = [];
    private activeSchoolClassId: number = null;

    private activeSemesterId: number = null;
    private institutionDialogRef: MdDialogRef<InstitutionDialog>;
    private schoolClassDialogRef: MdDialogRef<SchoolClassDialog>;
    private schoolYearDialogRef: MdDialogRef<SchoolYearDialog>;
    private semesterDialogRef: MdDialogRef<SemesterDialog>;
    private subjectDialogRef: MdDialogRef<SubjectDialog>;

    private activeManageView;
    public marginLeft: number = 0;
    public columnClasses = {};
    public mobileTitle: string;

    constructor(private manageService: ManageService,
                private institutionService: InstitutionService,
                private schoolClassService: SchoolClassService,
                private schoolYearService: SchoolYearService,
                private semesterService: SemesterService,
                private subjectService: SubjectService,
                private notificationService: NotificationsService,
                private confirmDialogService: ConfirmDialogService,
                private manageDialogFactory: ManageDialogFactory,
                private elementRef: ElementRef,
                private responsiveHelper: ResponsiveHelperService) {
    }

    ngOnInit() {
        this.manageService.getManageData()
            .subscribe((res) => this.prepareManageData(res));
    }

    ngAfterViewInit() {
        this.responsiveHelper.listenForOrientationChange().subscribe(() => this.calculateMarginLeftByCurrentView());
        this.responsiveHelper.listenForResize().subscribe(() => {
            this.calculateMarginLeftByCurrentView();
            this.setColumnClasses();
        });

        this.activeManageView = ManageView.INSTITUTION_CLASS;
        this.mobileTitle = I18N_PREFIX + ManageView[this.activeManageView];
        this.setColumnClasses();
    }

    private calculateMarginLeftByCurrentView() {
        this.marginLeft = -(this.activeManageView * this.elementRef.nativeElement.offsetWidth);
    }

    //region responsive
    public isMobile() {
        return this.responsiveHelper.isMobile();
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
            this.activeManageView = this.activeManageView + next;
            this.mobileTitle = I18N_PREFIX + ManageView[this.activeManageView];
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
        let nextView = this.activeManageView + next;
        //noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
        return ManageView[nextView] !== undefined && isNotNull(this.currentManageData[nextView]);
    }

    //endregion

    //region helper
    private selectSchoolClass(schoolClassId: number) {
        let schoolClass = this.findSchoolClass(this.currentManageData[ManageView.INSTITUTION_CLASS] as InstitutionDto[], schoolClassId);
        if (isNotNull(schoolClass)) {
            this.currentManageData[ManageView.YEAR_SEMESTER] = schoolClass.schoolYears ? schoolClass.schoolYears : [];
            this.activeSchoolClassId = schoolClass.id;
            this.activeSemesterId = this.currentManageData[ManageView.SUBJECT] = null;
        }
        if (this.isMobile()) this.nextView();
    }

    private selectSemester(semesterId: number) {
        let semester = this.findSemester(this.currentManageData[ManageView.YEAR_SEMESTER] as SchoolYearDto[], semesterId);
        if (isNotNull(semester)) {
            this.currentManageData[ManageView.SUBJECT] = semester.subjects ? semester.subjects : [];
            this.activeSemesterId = semester.id;
        }
        if (this.isMobile()) this.nextView();
    }

    private findSemester(schoolYears: SchoolYearDto[], semesterId: number): SemesterDto {
        for (let schoolYear of schoolYears) {
            let semester: SemesterDto = <SemesterDto>schoolYear.semesters.find((semester: SemesterDto) => {
                return semester.id === semesterId;
            });
            if (isNotNull(semester)) return semester;
        }
        return null;
    }

    private findSchoolClass(institutions: InstitutionDto[], schoolClassId: number): SchoolClassDto {
        for (let institution of institutions) {
            let schoolClass: SchoolClassDto = <SchoolClassDto>institution.schoolClasses.find((schoolClass: SchoolClassDto) => {
                return schoolClass.id === schoolClassId;
            });
            if (isNotNull(schoolClass)) return schoolClass;
        }
        return null;
    }

    private prepareManageData(manageData: ManageDto) {
        this.manageData = manageData;
        this.currentManageData[ManageView.INSTITUTION_CLASS] = manageData.institutions;
    }

    //endregion

    //region add
    public addInstitution() {
        this.institutionDialogRef = this.manageDialogFactory.getDialog(InstitutionDialog, DialogMode.NEW, null);
        this.handleAddition<InstitutionDto, InstitutionDialog>('institution', this.institutionDialogRef, this.institutionService.create,
            (institution: InstitutionDto) => this.currentManageData[ManageView.INSTITUTION_CLASS].push(institution), this.institutionService
        );
    }

    public addSchoolClass(institution: InstitutionDto) {
        this.schoolClassDialogRef = this.manageDialogFactory.getDialog(SchoolClassDialog, DialogMode.NEW, institution);
        this.handleAddition<SchoolClassDto, SchoolClassDialog>('schoolClass', this.schoolClassDialogRef, this.schoolClassService.create,
            (schoolClass: SchoolClassDto) => {
                if (isNull(institution.schoolClasses)) institution.schoolClasses = [];
                institution.schoolClasses.push(schoolClass);
            }, this.schoolClassService);
    }

    public addSchoolYear(schoolClassId: number) {
        if (isNotNull(schoolClassId)) {
            let schoolClass: SchoolClassDto = this.findSchoolClass(this.currentManageData[ManageView.INSTITUTION_CLASS] as InstitutionDto[], schoolClassId);
            this.schoolYearDialogRef = this.manageDialogFactory.getDialog(SchoolYearDialog, DialogMode.NEW, schoolClass);
            this.handleAddition<SchoolYearDto, SchoolYearDialog>('schoolYear', this.schoolYearDialogRef, this.schoolYearService.create,
                (schoolYear: SchoolYearDto) => this.currentManageData[ManageView.YEAR_SEMESTER].push(schoolYear), this.schoolYearService
            );
        }
    }

    public addSemester(schoolYear: SchoolYearDto) {
        if (isNotNull(schoolYear)) {
            this.semesterDialogRef = this.manageDialogFactory.getDialog(SemesterDialog, DialogMode.NEW, schoolYear);
            this.handleAddition<SemesterDto, SemesterDialog>('semester', this.semesterDialogRef, this.semesterService.create,
                (semester: SemesterDto) => {
                    if (isNull(schoolYear.semesters)) schoolYear.semesters = [];
                    schoolYear.semesters.push(semester);
                }, this.semesterService);
        }
    }

    public addSubject(semesterId: number) {
        if (isNotNull(semesterId)) {
            let semester: SemesterDto = this.findSemester(this.currentManageData[ManageView.YEAR_SEMESTER] as SchoolYearDto[], semesterId);
            this.subjectDialogRef = this.manageDialogFactory.getDialog(SubjectDialog, DialogMode.NEW, semester);
            this.handleAddition<SubjectDto, SubjectDialog>('subject', this.subjectDialogRef, this.subjectService.create,
                (subject: SubjectDto) => this.currentManageData[ManageView.SUBJECT].push(subject), this.subjectService
            );
        }
    }

    //endregion

    //region delete
    public deleteInstitution(toDelete: InstitutionDto) {
        this.handleDeletion(toDelete, 'institution', this.institutionService.deleteById,
            (institution) => Util.arrayRemove(this.currentManageData[ManageView.INSTITUTION_CLASS], (i) => i.id == institution.id),
            this.institutionService
        );
    }

    public deleteSchoolClass(toDelete: SchoolClassDto) {
        this.handleDeletion(toDelete, 'schoolClass', this.schoolClassService.deleteById, (schoolClass) => {
            let institution = (this.currentManageData[ManageView.INSTITUTION_CLASS] as InstitutionDto[]).find(inst => inst.id === schoolClass.institutionId);
            Util.arrayRemove(institution.schoolClasses, (clazz) => clazz.id == schoolClass.id);
        }, this.schoolClassService);
    }

    public deleteSchoolYear(toDelete: SchoolYearDto) {
        this.handleDeletion(toDelete, 'schoolYear', this.schoolYearService.deleteById,
            (schoolYear) => Util.arrayRemove(this.currentManageData[ManageView.YEAR_SEMESTER], (year) => year.id == schoolYear.id),
            this.schoolYearService
        );
    }

    public deleteSemester(toDelete: SemesterDto) {
        this.handleDeletion(toDelete, 'semester', this.semesterService.deleteById, (semester) => {
            let schoolYear = (this.currentManageData[ManageView.YEAR_SEMESTER] as SchoolYearDto[]).find(year => year.id === semester.schoolYearId);
            Util.arrayRemove(schoolYear.semesters, (sem) => sem.id == semester.id);
        }, this.semesterService);
    }

    public deleteSubject(toDelete: SubjectDto) {
        this.handleDeletion(toDelete, 'subject', this.subjectService.deleteById,
            (subject) => Util.arrayRemove(this.currentManageData[ManageView.SUBJECT], (sub) => sub.id == subject.id),
            this.subjectService
        );
    }
    //endregion

    //region edit
    public editInstitution() {console.warn('Not implemented yet')}
    public editSchoolClass() {console.warn('Not implemented yet')}
    public editSchoolYear() {console.warn('Not implemented yet')}
    public editSemester() {console.warn('Not implemented yet')}
    public editSubject() {console.warn('Not implemented yet')}
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
    private handleDeletion<T extends Dto>(entity: T, entityName: string, deleteFunction: (id: number) => Observable<any>, finishFunction: (entity: T) => void, thisArg: any) {
        this.openDeleteConfirmDialog(entityName)
            .filter(isTrue)
            .switchMap(() => Util.bindAndCall(deleteFunction, thisArg, entity.id))
            .catch((error) => {
                this.notificationService.remove();
                this.notificationService.error('i18n.modules.task.notification.error.deleteFailed.title', 'i18n.modules.task.notification.error.deleteFailed.message');
                return Observable.empty();
            })
            .subscribe(() => {
                this.showDeleteSuccessNotification(entityName);
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
    private handleAddition<T extends Dto, D extends CreateUpdateDialog<T>>(entityName: string, dialogRef: MdDialogRef<D>, createFunction: (entity: T) => Observable<T>, finishFunction: (entity: T) => void, thisArg: any) {
        dialogRef.afterClosed()
            .filter(isNotNull)
            .flatMap((value: T) => Util.bindAndCall(createFunction, thisArg, value))
            .subscribe((entity: T) => {
                this.showSaveSuccessNotification(entityName);
                finishFunction(entity);
            });
    }

    //endregion

    private openDeleteConfirmDialog(moduleName: string) {
        return this.confirmDialogService.open('i18n.modules.manage.assureDeletion', `i18n.modules.manage.${moduleName}.confirmDeleteMessage`);
    }

    private showSaveSuccessNotification(entity: string) {
        this.notificationService.success('i18n.common.notification.success.save', `i18n.modules.manage.${entity}.notificationMessage.saveSuccess`);
    }

    private showDeleteSuccessNotification(entity: string) {
        this.notificationService.success('i18n.common.notification.success.delete', `i18n.modules.manage.${entity}.notificationMessage.deleteSuccess`);
    }
}
