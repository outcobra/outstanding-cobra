import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageDialog} from '../manage-dialog';
import {InstitutionDto} from '../model/ManageDto';
import {Util} from '../../shared/util/util';

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

    public institutionForm: FormGroup;

    ngOnInit() {
        this.institutionForm = this.formBuilder.group({
            name: [this.getParamOrDefault('name'), Validators.required]
        });
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    onSubmit() {
        if (this.institutionForm.valid && this.institutionForm.dirty) {
            let value = this.institutionForm.value as InstitutionDto;
            this.dialogRef.close(value);
        }
        else if (this.institutionForm.pristine) {
            Util.revalidateForm(this.institutionForm);
        }
    }

}
