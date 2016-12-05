import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ManageService} from "./service/manage.service";
import {ManageDto, InstitutionDto, SchoolClassDto, SchoolYearDto, SemesterDto, SubjectDto} from "./model/ManageDto";
import {MdDialog, MdDialogRef} from "@angular/material";
import {InstitutionDialog} from "./institution-dialog/institution-dialog.component";
import {DialogMode} from "../common/DialogMode";
import {SchoolClassDialog} from "./school-class-dialog/school-class-dialog.component";
import {InstitutionService} from "./service/institution.service";
import {SchoolClassService} from "./service/school-class.service";
import {SchoolYearDialog} from "./school-year-dialog/school-year-dialog.component";
import {SchoolYearService} from "./service/school-year.service";
import {SemesterDialog} from "./semester-dialog/semester-dialog.component";
import {SemesterService} from "./service/semester.service";

@Component({
    selector: 'manager',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManageComponent implements OnInit {
    private manageData: ManageDto;

    private institutionClasses: any = {};
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
                private dialog: MdDialog) {
    }

    ngOnInit() {
        this.manageService.getManageData()
            .subscribe((res) => this.prepareManageData(res));
    }

    selectSchoolClass(schoolClassId: number) {
        let schoolClass = this.findSchoolClass(this.manageData.institutions, schoolClassId);
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
        this.manageData = this.institutionClasses = manageData;
    }

    addInstitution() {
        this.institutionDialogRef = this.dialog.open(InstitutionDialog);
        this.institutionDialogRef.componentInstance.init(DialogMode.NEW, null);
        this.institutionDialogRef.afterClosed().subscribe((result: InstitutionDto) => {
            if (result != null) {
                this.institutionService.createInstitution(result).subscribe();
            }
        });
    }

    addSchoolClass(institution: InstitutionDto) {
        this.schoolClassDialogRef = this.dialog.open(SchoolClassDialog);
        this.schoolClassDialogRef.componentInstance.init(DialogMode.NEW, institution);
        this.schoolClassDialogRef.afterClosed().subscribe((result: SchoolClassDto) => {
            if (result) {
                result.institutionId = institution.id; // TODO move to dialog
                this.schoolClassService.createSchoolClass(result).subscribe();
            }
        });
    }

    addSchoolYear(schoolClassId: number) {
        if (schoolClassId != null) {
            let schoolClass: SchoolClassDto = this.findSchoolClass(this.manageData.institutions, schoolClassId);
            this.schoolYearDialogRef = this.dialog.open(SchoolYearDialog);
            this.schoolYearDialogRef.componentInstance.init(DialogMode.NEW, schoolClass);
            this.schoolYearDialogRef.afterClosed().subscribe((result: SchoolYearDto) => {
                if (result) {
                    result.schoolClassId = schoolClassId; // TODO move to dialog
                    this.schoolYearService.createSchoolYear(result).subscribe();
                }
            });
        }
    }

    addSemester(schoolYear: SchoolYearDto) {
        if (schoolYear != null) {
            this.semesterDialogRef = this.dialog.open(SemesterDialog);
            this.semesterDialogRef.componentInstance.init(DialogMode.NEW, schoolYear);
            this.semesterDialogRef.afterClosed().subscribe((result: SemesterDto) => {
                if (result) {
                    result.schoolYearId = schoolYear.id; // TODO move to dialog
                    this.semesterService.createSemester(result).subscribe();
                }
            });
        }
    }

    addSubject(semesterId: number) {

    }
}
