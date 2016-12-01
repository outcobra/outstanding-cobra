import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ManageService} from "./service/manage.service";
import {ManageData, Institution, SchoolClass, SchoolYear, Semester, Subject} from "./model/ManageData";
import {MdDialog, MdDialogRef} from "@angular/material";
import {InstitutionDialog} from "./institution-dialog/institution-dialog.component";
import {DialogMode} from "../common/DialogMode";
import {SchoolClassDialog} from "./school-class-dialog/school-class-dialog.component";
import {InstitutionService} from "./service/institution.service";
import {SchoolClassService} from "./service/school-class.service";
import {SchoolYearDialog} from "./school-year-dialog/school-year-dialog.component";

@Component({
    selector: 'manager',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ManageComponent implements OnInit {
    private manageData: ManageData;

    private institutionClasses: any = {};
    private yearSemesterModel: SchoolYear[] = null;
    private subjectModel: Subject[] = null;

    private institutionDialogRef: MdDialogRef<InstitutionDialog>;
    private schoolClassDialogRef: MdDialogRef<SchoolClassDialog>;
    private schoolYearDialogRef: MdDialogRef<SchoolYearDialog>;

    constructor(private manageService: ManageService,
                private institutionService: InstitutionService,
                private schoolClassService: SchoolClassService,
                private dialog: MdDialog) {
    }

    ngOnInit() {
        this.manageService.getManageData()
            .subscribe((res) => this.prepareManageData(res));
    }

    selectSchoolClass(schoolClassId: number) {
        this.manageData.institutions.some((institution: Institution) => {
            let schoolClass: SchoolClass = <SchoolClass>institution.schoolClasses.find((schoolClass: SchoolClass) => {
                return schoolClass.id === schoolClassId;
            });
            if (schoolClass !== undefined) {
                this.yearSemesterModel = schoolClass.schoolYears;
                this.subjectModel = null;
                return true;
            }
            return false;
        });
    }

    selectSemester(semesterId: number) {
        this.yearSemesterModel.some((schoolYear: SchoolYear) => {
            let semester: Semester = <Semester>schoolYear.semesters.find((semester: Semester) => {
                return semester.id === semesterId;
            });
            if (semester !== undefined) {
                this.subjectModel = semester.subjects;
                return true;
            }
            return false;
        });
    }

    prepareManageData(manageData: ManageData) {
        console.log(manageData);
        this.manageData = this.institutionClasses = manageData;
    }

    addInstitution() {
        this.institutionDialogRef = this.dialog.open(InstitutionDialog);
        this.institutionDialogRef.componentInstance.init(DialogMode.NEW);
        this.institutionDialogRef.afterClosed().subscribe((result: Institution) => {
            this.institutionService.createInstitution(result).subscribe();
        });
    }

    addSchoolClass(institutionId: number) {
        this.schoolClassDialogRef = this.dialog.open(SchoolClassDialog);
        this.schoolClassDialogRef.componentInstance.init(DialogMode.NEW);
        this.schoolClassDialogRef.afterClosed().subscribe((result: SchoolClass) => {
            result.institutionId = institutionId;
            this.schoolClassService.createSchoolClass(result).subscribe();
        });
    }

    addSchoolYear(schoolClassId: any) {
        console.log(schoolClassId);
        if (schoolClassId != null) {
            this.schoolYearDialogRef = this.dialog.open(SchoolYearDialog);
            this.schoolYearDialogRef.componentInstance.init(DialogMode.NEW);
            this.schoolYearDialogRef.afterClosed().subscribe((result: SchoolYear) => {
                result.schoolClassId = schoolClassId;
                //TODO this.schoolClassService.createSchoolClass(result).subscribe();
            });
        }
    }

    addSemester(schoolYearId: number) {

    }

    addSubject(semesterId: number) {

    }
}
