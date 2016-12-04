import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {MdDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ManageDialog} from "../manage-dialog";
import {DialogMode} from "../../common/DialogMode";
import {InstitutionDto} from "../model/ManageDto";

@Component({
    selector: 'institution-dialog',
    templateUrl: './institution-dialog.component.html',
    styleUrls: ['./institution-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InstitutionDialog extends ManageDialog<InstitutionDto, any> implements OnInit {

    constructor(public dialogRef: MdDialogRef<InstitutionDialog>, private formBuilder: FormBuilder) {
        super();
    }

    private institutionForm: FormGroup;

    ngOnInit() {
        this.institutionForm = this.formBuilder.group({
            name: [this.isEditMode() ? this.params.name : '', Validators.required]
        });
    }

    onSubmit() {
        if (this.institutionForm.valid && this.institutionForm.dirty) {
            this.dialogRef.close(this.institutionForm.value);
        }
        else if (this.institutionForm.pristine) {
            this.institutionForm.markAsDirty();
        }
    }

}
