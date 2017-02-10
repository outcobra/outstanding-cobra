import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ManageService} from './service/manage.service';
import {ManageDto, InstitutionDto, SchoolClassDto, SchoolYearDto, SemesterDto, SubjectDto} from './model/ManageDto';
import {MdDialogRef, MdDialogConfig} from '@angular/material';
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
import {Util} from '../shared/services/util';


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
    private subjectDialogRef: MdDialogRef<SubjectDialog>;

    constructor(private manageService: ManageService,
                private institutionService: InstitutionService,
                private schoolClassService: SchoolClassService,
                private schoolYearService: SchoolYearService,
                private semesterService: SemesterService,
                private subjectService: SubjectService,
                private notificationService: NotificationsService,
                private confirmDialogService: ConfirmDialogService,
                private manageDialogFactory: ManageDialogFactory) {
    }

    ngOnInit() {
        this.manageService.getManageData()
            .subscribe((res) => this.prepareManageData(res));
    }

    selectSchoolClass(schoolClassId: number) {
        let schoolClass = this.findSchoolClass(this.institutionClasses, schoolClassId);
        if (schoolClass != null) {
            this.yearSemesterModel = schoolClass.schoolYears ? schoolClass.schoolYears : [];
            this.activeSchoolClassId = schoolClass.id;
            this.activeSemesterId = this.subjectModel = null;
        }
    }

    selectSemester(semesterId: number) {
        let semester = this.findSemester(this.yearSemesterModel, semesterId);
        if (semester != null) {
            this.subjectModel = semester.subjects ? semester.subjects : [];
            this.activeSemesterId = semester.id;
        }
    }

    findSemester(schoolYears: SchoolYearDto[], semesterId: number): SemesterDto {
        for (let schoolYear of schoolYears) {
            let semester: SemesterDto = <SemesterDto>schoolYear.semesters.find((semester: SemesterDto) => {
                return semester.id === semesterId;
            });
            if (semester !== undefined) {
                return semester;
            }
        }
        return null;
    }

    findSchoolClass(institutions: InstitutionDto[], schoolClassId: number): SchoolClassDto {
        for (let institution of institutions) {
            let schoolClass: SchoolClassDto = <SchoolClassDto>institution.schoolClasses.find((schoolClass: SchoolClassDto) => {
                return schoolClass.id === schoolClassId;
            });
            if (schoolClass !== undefined) {
                return schoolClass;
            }
        }
        return null;
    }

    prepareManageData(manageData: ManageDto) {
        this.manageData = manageData;
        this.institutionClasses = manageData.institutions;
    }

    addInstitution() {
        this.institutionDialogRef = this.manageDialogFactory.getDialog(InstitutionDialog, DialogMode.NEW, null, DEFAULT_CONFIG);
        this.institutionDialogRef.afterClosed().subscribe((result: InstitutionDto) => {
            if (result != null) {
                this.institutionService.create(result).subscribe((institution: InstitutionDto) => {
                    this.showSuccessNotification('institution');
                    console.log(institution);
                    this.institutionClasses.push(institution);
                });
            }
        });
    }

    addSchoolClass(institution: InstitutionDto) {
        this.schoolClassDialogRef = this.manageDialogFactory.getDialog(SchoolClassDialog, DialogMode.NEW, institution, DEFAULT_CONFIG);
        this.schoolClassDialogRef.afterClosed().subscribe((result: SchoolClassDto) => {
            if (result) {
                this.schoolClassService.create(result).subscribe((schoolClass: SchoolClassDto) => {
                    this.showSuccessNotification('schoolClass');
                    if (!institution.schoolClasses) institution.schoolClasses = [];
                    institution.schoolClasses.push(schoolClass);
                });
            }
        });
    }

    addSchoolYear(schoolClassId: number) {
        if (schoolClassId != null) {
            let schoolClass: SchoolClassDto = this.findSchoolClass(this.institutionClasses, schoolClassId);
            this.schoolYearDialogRef = this.manageDialogFactory.getDialog(SchoolYearDialog, DialogMode.NEW, schoolClass, DEFAULT_CONFIG);
            this.schoolYearDialogRef.afterClosed().subscribe((result: SchoolYearDto) => {
                if (result) {
                    this.schoolYearService.create(result).subscribe((schoolYear: SchoolYearDto) => {
                        this.showSuccessNotification('schoolYear');
                        this.yearSemesterModel.push(schoolYear);
                    });
                }
            });
        }
    }

    addSemester(schoolYear: SchoolYearDto) {
        if (schoolYear != null) {
            this.semesterDialogRef = this.manageDialogFactory.getDialog(SemesterDialog, DialogMode.NEW, schoolYear, DEFAULT_CONFIG);
            this.semesterDialogRef.afterClosed().subscribe((result: SemesterDto) => {
                if (result) {
                    this.semesterService.create(result).subscribe((semester: SemesterDto) => {
                        this.showSuccessNotification('schoolYear');
                        if (!schoolYear.semesters) schoolYear.semesters = [];
                        schoolYear.semesters.push(semester);
                    });
                }
            });
        }
    }

    addSubject(semesterId: number) {
        if (semesterId != null) {
            let semester: SemesterDto = this.findSemester(this.yearSemesterModel, semesterId);
            this.subjectDialogRef = this.manageDialogFactory.getDialog(SubjectDialog, DialogMode.NEW, semester, DEFAULT_CONFIG);
            this.subjectDialogRef.afterClosed().subscribe((result: SubjectDto) => {
                if (result) {
                    this.subjectService.create(result).subscribe((subject: SubjectDto) => {
                        this.showSuccessNotification('subject');
                        this.subjectModel.push(subject);
                    });
                }
            });
        }
    }

    deleteInstitution(institution: InstitutionDto) {
        this.openDeleteConfirmDialog('institution').subscribe((result) => {
            if (result === true) {
                this.institutionService.deleteById(institution.id).subscribe();
                Util.arrayRemove(this.institutionClasses, (inst) => inst.id == institution.id);
            }
        });
    }

    deleteSchoolClass(schoolClass: SchoolClassDto) {
        this.openDeleteConfirmDialog('schoolClass').subscribe((result) => {
            if (result === true) {
                this.schoolClassService.deleteById(schoolClass.id).subscribe();
                let institution = this.institutionClasses.find(inst => inst.schoolClasses.findIndex(clazz => clazz.id == schoolClass.id) !== undefined);
                Util.arrayRemove(institution.schoolClasses, (clazz) => clazz.id == schoolClass.id);
            }
        });
    }

    deleteSchoolYear(schoolYear: SchoolYearDto) {
        this.openDeleteConfirmDialog('schoolYear').subscribe((result) => {
            if (result === true) {
                this.schoolYearService.deleteById(schoolYear.id).subscribe();
                Util.arrayRemove(this.yearSemesterModel, (year) => year.id == schoolYear.id);
            }
        });
    }

    deleteSemester(semester: SemesterDto) {
        this.openDeleteConfirmDialog('semester').subscribe((result) => {
            if (result === true) {
                this.semesterService.deleteById(semester.id).subscribe();
                let schoolYear = this.yearSemesterModel.find(year => year.semesters.findIndex(sem => sem.id == semester.id) !== undefined);
                Util.arrayRemove(schoolYear.semesters, (sem) => sem.id == semester.id);
            }
        });
    }

    deleteSubject(subject: SubjectDto) {
        this.openDeleteConfirmDialog('subject').subscribe((result) => {
            if (result === true) {
                this.subjectService.deleteById(subject.id).subscribe();
                Util.arrayRemove(this.subjectModel, (sub) => sub.id == subject.id);
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
