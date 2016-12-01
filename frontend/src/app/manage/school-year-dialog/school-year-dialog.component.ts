import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {ManageDialog} from "../manage-dialog";
import {SchoolYear} from "../model/ManageData";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {DialogMode} from "../../common/DialogMode";

@Component({
    selector: 'app-school-year-dialog',
    templateUrl: './school-year-dialog.component.html',
    styleUrls: ['school-year-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SchoolYearDialog extends ManageDialog<SchoolYear> implements OnInit {

    private schoolYearForm: FormGroup;

    constructor(public dialogRef: MdDialogRef<SchoolYearDialog>, private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.schoolYearForm = this.fb.group({
            schoolYearName: [this.mode == DialogMode.EDIT ? this.params.name : '', Validators.required],
            schoolYearDateFrom: [this.mode == DialogMode.EDIT ? this.params.validFrom : '', Validators.required],
            schoolYearDateTo: [this.mode == DialogMode.EDIT ? this.params.validTo : '', Validators.required]
        })
    }

    onSubmit() {/*
     if (this.schoolClassForm.valid && this.schoolClassForm.dirty) {
     let schoolClassName = this.schoolClassForm.value.schoolClassName;
     this.dialogRef.close({normalizedName: schoolClassName});
     }
     else if (this.schoolClassForm.pristine) {
     this.schoolClassForm.markAsDirty();
     }*/
    }

}
