import {Component, OnInit} from '@angular/core';
import {ManageDialog} from '../manage-dialog';
import {InstitutionDto, SchoolClassDto} from '../model/manage.dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import {Util} from '../../core/util/util';

@Component({
    selector: 'school-class-dialog',
    templateUrl: './school-class-dialog.component.html',
    styleUrls: ['./school-class-dialog.component.scss']
})
export class SchoolClassDialog extends ManageDialog<SchoolClassDto, InstitutionDto> implements OnInit {

    private _schoolClassForm: FormGroup;

    constructor(private _dialogRef: MdDialogRef<SchoolClassDialog>, private _formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this._schoolClassForm = this._formBuilder.group({
            normalizedName: [this.getParamOrDefault('normalizedName'), Validators.required]
        });
    }

    public submit() {
        if (!(this._schoolClassForm.valid && this._schoolClassForm.dirty)) {
            Util.revalidateForm(this._schoolClassForm);
            return;
        }
        if (this.isEditMode()) {
            this.param.normalizedName = this._schoolClassForm.get('normalizedName').value;
            this._dialogRef.close(this.param);
        } else {
            let value = this._schoolClassForm.value as SchoolClassDto;
            value.institutionId = this.parent.id;
            this._dialogRef.close(value);
        }
    }


    get schoolClassForm(): FormGroup {
        return this._schoolClassForm;
    }
}
