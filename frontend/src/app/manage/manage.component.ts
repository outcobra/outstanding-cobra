import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ManageService} from "./service/manage.service";
import {ManageDto, InstitutionDto, SchoolClassDto, SchoolYearDto, SemesterDto, SubjectDto} from "./model/ManageDto";
import {MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
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


const DEFAULT_CONFIG: MdDialogConfig = {position: {top: '20px'}};

@Component({
    selector: 'manager',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManageComponent implements OnInit {

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

    constructor(private manageService: ManageService,
                private institutionService: InstitutionService,
                private schoolClassService: SchoolClassService,
                private schoolYearService: SchoolYearService,
                private semesterService: SemesterService,
                private notificationService: NotificationsService,
                private confirmDialogService: ConfirmDialogService,
                private dialog: MdDialog,
                private factory: ManageDialogFactory) {
    }

    ngOnInit() {
        this.manageService.getManageData()
            .subscribe((res) => this.prepareManageData(res));
    }

    selectSchoolClass(schoolClassId: number) {
        let schoolClass = this.findSchoolClass(this.institutionClasses, schoolClassId);
        if (schoolClass != null) {
            this.yearSemesterModel = schoolClass.schoolYears;
            this.activeSchoolClassId = schoolClass.id;
            this.activeSemesterId = this.subjectModel = null;
        }
    }

    selectSemester(semesterId: number) {
        this.yearSemesterModel.some((schoolYear: SchoolYearDto) => {
            let semester: SemesterDto = <SemesterDto>schoolYear.semesters.find((semester: SemesterDto) => {
                return semester.id === semesterId;
            });
            if (semester !== undefined) {
                this.subjectModel = semester.subjects;
                this.activeSemesterId = semester.id;
                return true;
            }
            return false;
        });
    }

    findSchoolClass(institutions: InstitutionDto[], schoolClassId: number) {
        let foundSchoolClass: SchoolClassDto = null;
        institutions.some((institution: InstitutionDto) => {
            let schoolClass: SchoolClassDto = <SchoolClassDto>institution.schoolClasses.find((schoolClass: SchoolClassDto) => {
                return schoolClass.id === schoolClassId;
            });
            if (schoolClass !== undefined) {
                foundSchoolClass = schoolClass;
                return true;
            }
            return false;
        });
        return foundSchoolClass;
    }

    prepareManageData(manageData: ManageDto) {
        this.manageData = manageData;
        this.institutionClasses = manageData.institutions;
    }

    addInstitution() {
        this.institutionDialogRef = this.factory.getDialog(InstitutionDialog, DialogMode.NEW, null, DEFAULT_CONFIG);
        this.institutionDialogRef.afterClosed().subscribe((result: InstitutionDto) => {
            if (result != null) {
                this.institutionService.createInstitution(result).subscribe((institution: InstitutionDto) => {
                    this.showSuccessNotification('institution');
                    this.institutionClasses.push(institution);
                });
            }
        });
    }

    addSchoolClass(institution: InstitutionDto) {
        this.schoolClassDialogRef = this.factory.getDialog(SchoolClassDialog, DialogMode.NEW, institution, DEFAULT_CONFIG);
        this.schoolClassDialogRef.afterClosed().subscribe((result: SchoolClassDto) => {
            if (result) {
                this.schoolClassService.createSchoolClass(result).subscribe((schoolClass: SchoolClassDto) => {
                    this.showSuccessNotification('schoolClass');
                    institution.schoolClasses.push(schoolClass);
                });
            }
        });
    }

    addSchoolYear(schoolClassId: number) {
        if (schoolClassId != null) {
            let schoolClass: SchoolClassDto = this.findSchoolClass(this.institutionClasses, schoolClassId);
            this.schoolYearDialogRef = this.factory.getDialog(SchoolYearDialog, DialogMode.NEW, schoolClass, DEFAULT_CONFIG);
            this.schoolYearDialogRef.afterClosed().subscribe((result: SchoolYearDto) => {
                if (result) {
                    this.schoolYearService.createSchoolYear(result).subscribe((schoolYear: SchoolYearDto) => {
                        this.showSuccessNotification('schoolYear');
                        this.yearSemesterModel.push(schoolYear);
                    });
                }
            });
        }
    }

    addSemester(schoolYear: SchoolYearDto) {
        if (schoolYear != null) {
            this.semesterDialogRef = this.factory.getDialog(SemesterDialog, DialogMode.NEW, schoolYear, DEFAULT_CONFIG);
            this.semesterDialogRef.afterClosed().subscribe((result: SemesterDto) => {
                if (result) {
                    this.semesterService.createSemester(result).subscribe((semester: SemesterDto) => {
                        this.showSuccessNotification('schoolYear');
                        schoolYear.semesters.push(semester);
                    });
                }
            });
        }
    }

    addSubject(semesterId: number) {

    }

    deleteInstitution(institution: InstitutionDto) {
        this.openDeleteConfirmDialog('institution').subscribe((result) => {
            if (result === true) {
                this.institutionService.deleteInstitution(institution).subscribe();
            }
        });
    }

    deleteSchoolClass(schoolClass: SchoolClassDto) {
        this.openDeleteConfirmDialog('schoolClass').subscribe((result) => {
            if (result === true) {
                this.schoolClassService.deleteSchoolClass(schoolClass).subscribe();
            }
        });
    }

    deleteSchoolYear(schoolYear: SchoolYearDto) {
        this.openDeleteConfirmDialog('schoolYear').subscribe((result) => {
            if (result === true) {
                this.schoolYearService.deleteSchoolYear(schoolYear).subscribe();
            }
        });
    }

    deleteSemester(semester: SemesterDto) {
        this.openDeleteConfirmDialog('semester').subscribe((result) => {
            if (result === true) {
                this.semesterService.deleteSemester(semester).subscribe();
            }
        });
    }

    openDeleteConfirmDialog(moduleName: string) {
        return this.confirmDialogService.open('i18n.modules.manage.assureDeletion', `i18n.modules.manage.${moduleName}.confirmDeleteMessage`);
    }

    showSuccessNotification(entity: string) {
        this.notificationService.success('i18n.common.notification.success.save', `i18n.modules.manage.${entity}.notificationMessage.saveSuccess`);
    }
}
