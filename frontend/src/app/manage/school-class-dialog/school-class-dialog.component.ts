import {Component, OnInit} from "@angular/core";
import {ManageDialog} from "../manage-dialog";
import {SchoolClassDto} from "../model/ManageDto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {DialogMode} from "../../common/DialogMode";

@Component({
    selector: 'school-class-dialog',
    templateUrl: './school-class-dialog.component.html',
    styleUrls: ['./school-class-dialog.component.scss']
})
export class SchoolClassDialog extends ManageDialog<SchoolClassDto> implements OnInit {

    private schoolClassForm: FormGroup;

    constructor(public dialogRef: MdDialogRef<SchoolClassDialog>, private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.schoolClassForm = this.formBuilder.group({
            schoolClassName: [this.mode == DialogMode.EDIT ? this.params.name : '', Validators.required]
        })
    }

    onSubmit() {
        if (this.schoolClassForm.valid && this.schoolClassForm.dirty) {
            let schoolClassName = this.schoolClassForm.value.schoolClassName;
            this.dialogRef.close({normalizedName: schoolClassName});
        }
        else if (this.schoolClassForm.pristine) {
            this.schoolClassForm.markAsDirty();
        }
    }

}
