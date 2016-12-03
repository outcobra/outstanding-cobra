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
export class InstitutionDialog extends ManageDialog<InstitutionDto> implements OnInit {

    constructor(public dialogRef: MdDialogRef<InstitutionDialog>, private formBuilder: FormBuilder) {
        super();
    }

    private institutionForm: FormGroup;

    ngOnInit() {
        this.institutionForm = this.formBuilder.group({
            name: [this.mode == DialogMode.EDIT ? this.params.name : '', Validators.required]
        });
    }


    public init(mode: DialogMode, params?: InstitutionDto): void {
        super.init(mode, params);
    }

    onSubmit() {
        if (this.institutionForm.valid && this.institutionForm.dirty) {
            let institutionName = this.institutionForm.value.institutionName;
            this.dialogRef.close({institutionName: institutionName});
        }
        else if (this.institutionForm.pristine) {
            this.institutionForm.markAsDirty();
        }
    }

}
