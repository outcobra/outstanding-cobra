import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ManageService} from "./manage.service";
import {ManageData, Institution, SchoolClass, SchoolYear, Semester, Subject} from "./model/ManageData";
import {Util} from "../shared/services/util";
import {MdDialog, MdDialogRef} from "@angular/material";
import {InstitutionDialog} from "./institution-dialog/institution-dialog.component";

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

    constructor(private manageService: ManageService, private dialog: MdDialog) {
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
        this.manageData = this.institutionClasses = manageData;
    }

    addInstitution() {
        this.institutionDialogRef = this.dialog.open(InstitutionDialog);
    }

    addSchoolClass() {

    }

    addSchoolYear() {

    }

    addSemester() {

    }

    addSubject() {

    }

    /*keys(obj: Object) {
        return Util.keys(obj);
    }*/

}
