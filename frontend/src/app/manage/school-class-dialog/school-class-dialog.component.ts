import {Component, OnInit} from "@angular/core";
import {ManageDialog} from "../manage-dialog";
import {InstitutionDto, SchoolClassDto} from "../model/ManageDto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {Util} from "../../shared/util/util";

@Component({
    selector: 'school-class-dialog',
    templateUrl: './school-class-dialog.component.html',
    styleUrls: ['./school-class-dialog.component.scss']
})
export class SchoolClassDialog extends ManageDialog<SchoolClassDto, InstitutionDto> implements OnInit {

    private schoolClassForm: FormGroup;

    constructor(public dialogRef: MdDialogRef<SchoolClassDialog>, private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.schoolClassForm = this.formBuilder.group({
            normalizedName: [this.getParamOrDefault('normalizedName'), Validators.required]
        });
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    onSubmit() {
        if (this.schoolClassForm.valid && this.schoolClassForm.dirty) {
            let value = this.schoolClassForm.value as SchoolClassDto;
            value.institutionId = this.parent.id;
            this.dialogRef.close(value);
        }
        else if (this.schoolClassForm.pristine) {
            Util.revalidateForm(this.schoolClassForm);
        }
    }

}
