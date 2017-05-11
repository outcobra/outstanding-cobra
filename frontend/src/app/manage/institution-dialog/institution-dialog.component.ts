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

    private _institutionForm: FormGroup;

    constructor(private _dialogRef: MdDialogRef<InstitutionDialog>, private _formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this._institutionForm = this._formBuilder.group({
            name: [this.getParamOrDefault('name'), Validators.required]
        });
    }

    public cancel() {
        this._dialogRef.close(null);
    }

    public submit() {
        if (this._institutionForm.valid && this._institutionForm.dirty) {
            let value = this._institutionForm.value as InstitutionDto;
            value.id = this.isEditMode() && this.param.id ? this.param.id : null;
            this._dialogRef.close(value);
        }
        else {
            Util.revalidateForm(this._institutionForm);
        }
    }


    get institutionForm(): FormGroup {
        return this._institutionForm;
    }
}
