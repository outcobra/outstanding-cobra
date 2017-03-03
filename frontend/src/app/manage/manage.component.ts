import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from "@angular/core";
import {ManageService} from "./service/manage.service";
import {InstitutionDto, ManageDto, SchoolClassDto, SchoolYearDto, SemesterDto, SubjectDto} from "./model/ManageDto";
import {HammerInput, MdDialogRef} from "@angular/material";
import {InstitutionDialog} from "./institution-dialog/institution-dialog.component";
import {DialogMode} from "../common/DialogMode";
import {SchoolClassDialog} from "./school-class-dialog/school-class-dialog.component";
import {InstitutionService} from "./service/institution.service";
import {SchoolClassService} from "./service/school-class.service";
import {SchoolYearDialog} from "./school-year-dialog/school-year-dialog.component";
import {SchoolYearService} from "./service/school-year.service";
import {SemesterDialog} from "./semester-dialog/semester-dialog.component";
import {SemesterService} from "./service/semester.service";
import {NotificationsService} from "angular2-notifications";
import {ConfirmDialogService} from "../shared/services/confirm-dialog.service";
import {ManageDialogFactory} from "./service/manage-dialog-factory";
import {SubjectDialog} from "./subject-dialog/subject-dialog.component";
import {SubjectService} from "./service/subject.service";
import {Util} from "../shared/util/util";
import {SMALL_DIALOG} from "../shared/util/const";
import {isNotNull, isTrue} from "../shared/util/helper";
import {Observable} from "rxjs";
import {Dto} from "../common/Dto";
import {CreateUpdateDialog} from "../common/CreateUpdateDialog";
import {ResponsiveHelperService} from "../shared/services/ui/responsive-helper.service";

enum ManageView {
    INSTITUTION_CLASS = 1,
    YEAR_SEMESTER = 2,
    SUBJECT = 3
}

const I18N_PREFIX = 'i18n.modules.manage.mobile.title.';

@Component({
    selector: 'manager',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManageComponent implements OnInit, AfterViewInit {

    private manageData: ManageDto;
    private institutionClasses: InstitutionDto[] = null;
    private yearSemesterModel: SchoolYearDto[] = null;
    private subjectModel: SubjectDto[] = null;
    private activeSchoolClassId: number = null;

    private activeSemesterId: number = null;
    private institutionDialogRef: MdDialogRef<InstitutionDialog>;
    private schoolClassDialogRef: MdDialogRef<SchoolClassDialog>;
    private schoolYearDialogRef: MdDialogRef<SchoolYearDialog>;
    private semesterDialogRef: MdDialogRef<SemesterDialog>;
    private subjectDialogRef: MdDialogRef<SubjectDialog>;

    private activeManageView;
    private marginLeft: number = 0;
    private columnClasses = {};
    private mobileTitle: string;

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
        this.responsiveHelper.listenForResize().subscribe(this.setColumnClasses);

        this.activeManageView = ManageView.INSTITUTION_CLASS;
        this.mobileTitle = I18N_PREFIX + ManageView[this.activeManageView];
        this.setColumnClasses();
    }

    //region responsive
    private isMobile() {
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
            this.marginLeft -= next * this.elementRef.nativeElement.offsetWidth;
            this.activeManageView = this.activeManageView + next;
            this.mobileTitle = I18N_PREFIX + ManageView[this.activeManageView];
        }
    }

    private lastView() {
        this.changeView(-1);
    }

    private nextView() {
        this.changeView(1);
    }

    private isValidDirection(next: number): boolean {
        //noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
        return ManageView[this.activeManageView + next] !== undefined;
    }

    private swipe(event: HammerInput) {
        if (!this.isMobile()) return;
        if (event.deltaX > 0) {
            this.nextView();
        } else {
            this.lastView();
        }
    }
    //endregion

    //region helper
    selectSchoolClass(schoolClassId: number) {
        let schoolClass = this.findSchoolClass(this.institutionClasses, schoolClassId);
        if (isNotNull(schoolClass)) {
            this.yearSemesterModel = schoolClass.schoolYears ? schoolClass.schoolYears : [];
            this.activeSchoolClassId = schoolClass.id;
            this.activeSemesterId = this.subjectModel = null;
        }
        if (this.isMobile()) this.nextView();
    }

    selectSemester(semesterId: number) {
        let semester = this.findSemester(this.yearSemesterModel, semesterId);
        if (isNotNull(semester)) {
            this.subjectModel = semester.subjects ? semester.subjects : [];
            this.activeSemesterId = semester.id;
        }
        if (this.isMobile()) this.nextView();
    }

    findSemester(schoolYears: SchoolYearDto[], semesterId: number): SemesterDto {
        for (let schoolYear of schoolYears) {
            let semester: SemesterDto = <SemesterDto>schoolYear.semesters.find((semester: SemesterDto) => {
                return semester.id === semesterId;
            });
            if (isNotNull(semester)) return semester;
        }
        return null;
    }

    findSchoolClass(institutions: InstitutionDto[], schoolClassId: number): SchoolClassDto {
        for (let institution of institutions) {
            let schoolClass: SchoolClassDto = <SchoolClassDto>institution.schoolClasses.find((schoolClass: SchoolClassDto) => {
                return schoolClass.id === schoolClassId;
            });
            if (isNotNull(schoolClass)) return schoolClass;
        }
        return null;
    }

    prepareManageData(manageData: ManageDto) {
        this.manageData = manageData;
        this.institutionClasses = manageData.institutions;
    }

    //endregion

    //region add
    addInstitution() {
        this.institutionDialogRef = this.manageDialogFactory.getDialog(InstitutionDialog, DialogMode.NEW, null, SMALL_DIALOG);
        this.handleAddition<InstitutionDto, InstitutionDialog>('institution', this.institutionDialogRef, this.institutionService.create,
            (institution: InstitutionDto) => this.institutionClasses.push(institution), this.institutionService
        );
    }

    addSchoolClass(institution: InstitutionDto) {
        this.schoolClassDialogRef = this.manageDialogFactory.getDialog(SchoolClassDialog, DialogMode.NEW, institution, SMALL_DIALOG);
        this.handleAddition<SchoolClassDto, SchoolClassDialog>('schoolClass', this.schoolClassDialogRef, this.schoolClassService.create,
            (schoolClass: SchoolClassDto) => {
                if (isNotNull(institution.schoolClasses)) institution.schoolClasses = [];
                institution.schoolClasses.push(schoolClass);
            }, this.schoolClassService);
    }

    addSchoolYear(schoolClassId: number) {
        if (isNotNull(schoolClassId)) {
            let schoolClass: SchoolClassDto = this.findSchoolClass(this.institutionClasses, schoolClassId);
            this.schoolYearDialogRef = this.manageDialogFactory.getDialog(SchoolYearDialog, DialogMode.NEW, schoolClass, SMALL_DIALOG);
            this.handleAddition<SchoolYearDto, SchoolYearDialog>('schoolYear', this.schoolYearDialogRef, this.schoolYearService.create,
                (schoolYear: SchoolYearDto) => this.yearSemesterModel.push(schoolYear), this.schoolYearService
            );
        }
    }

    addSemester(schoolYear: SchoolYearDto) {
        if (isNotNull(schoolYear)) {
            this.semesterDialogRef = this.manageDialogFactory.getDialog(SemesterDialog, DialogMode.NEW, schoolYear, SMALL_DIALOG);
            this.handleAddition<SemesterDto, SemesterDialog>('semester', this.semesterDialogRef, this.semesterService.create,
                (semester: SemesterDto) => {
                    if (isNotNull(schoolYear.semesters)) schoolYear.semesters = [];
                    schoolYear.semesters.push(semester);
                }, this.semesterService);
        }
    }

    addSubject(semesterId: number) {
        if (isNotNull(semesterId)) {
            let semester: SemesterDto = this.findSemester(this.yearSemesterModel, semesterId);
            this.subjectDialogRef = this.manageDialogFactory.getDialog(SubjectDialog, DialogMode.NEW, semester, SMALL_DIALOG);
            this.handleAddition<SubjectDto, SubjectDialog>('subject', this.subjectDialogRef, this.subjectService.create,
                (subject: SubjectDto) => this.subjectModel.push(subject), this.subjectService
            );
        }
    }

    //endregion

    //region delete
    deleteInstitution(toDelete: InstitutionDto) {
        this.handleDeletion(toDelete, 'institution', this.institutionService.deleteById,
            (institution) => Util.arrayRemove(this.institutionClasses, (i) => i.id == institution.id)
        );
    }

    deleteSchoolClass(toDelete: SchoolClassDto) {
        this.handleDeletion(toDelete, 'schoolClass', this.schoolClassService.deleteById, (schoolClass) => {
            let institution = this.institutionClasses.find(inst => inst.id === schoolClass.institutionId);
            Util.arrayRemove(institution.schoolClasses, (clazz) => clazz.id == schoolClass.id);
        });
    }

    deleteSchoolYear(toDelete: SchoolYearDto) {
        this.handleDeletion(toDelete, 'schoolYear', this.schoolYearService.deleteById,
            (schoolYear) => Util.arrayRemove(this.yearSemesterModel, (year) => year.id == schoolYear.id)
        );
    }

    deleteSemester(toDelete: SemesterDto) {
        this.handleDeletion(toDelete, 'semester', this.semesterService.deleteById, (semester) => {
            let schoolYear = this.yearSemesterModel.find(year => year.id === semester.schoolYearId);
            Util.arrayRemove(schoolYear.semesters, (sem) => sem.id == semester.id);
        });
    }

    deleteSubject(toDelete: SubjectDto) {
        this.handleDeletion(toDelete, 'subject', this.subjectService.deleteById,
            (subject) => Util.arrayRemove(this.subjectModel, (sub) => sub.id == subject.id)
        );
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
     */
    handleDeletion<T extends Dto>(entity: T, entityName: string, deleteFunction: (id: number) => Observable<any>, finishFunction: (entity: T) => void) {
        this.openDeleteConfirmDialog(entityName)
            .filter(isTrue)
            .switchMap(() => deleteFunction(entity.id))
            .catch(() => {
                this.notificationService.remove();
                this.notificationService.error('i18n.modules.task.notification.error.deleteFailed.title', 'i18n.modules.task.notification.error.deleteFailed.message');
                return Observable.empty();
            })
            .subscribe(() => {
                this.showDeleteSuccessNotification(entityName);
                finishFunction(entity)
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
     */
    handleAddition<T extends Dto, D extends CreateUpdateDialog<T>>(entityName: string, dialogRef: MdDialogRef<D>, createFunction: (entity: T) => Observable<T>, finishFunction: (entity: T) => void, thisArg: any) {
        dialogRef.afterClosed()
            .filter(isNotNull)
            .flatMap((value: T) => Util.bindAndCall(createFunction, thisArg, value))
            .subscribe((entity: T) => {
                this.showSaveSuccessNotification(entityName);
                finishFunction(entity)
            });
    }

    //endregion

    openDeleteConfirmDialog(moduleName: string) {
        return this.confirmDialogService.open('i18n.modules.manage.assureDeletion', `i18n.modules.manage.${moduleName}.confirmDeleteMessage`);
    }

    showSaveSuccessNotification(entity: string) {
        this.notificationService.success('i18n.common.notification.success.save', `i18n.modules.manage.${entity}.notificationMessage.saveSuccess`);
    }

    showDeleteSuccessNotification(entity: string) {
        this.notificationService.success('i18n.common.notification.success.delete', `i18n.modules.manage.${entity}.notificationMessage.deleteSuccess`);
    }
}
