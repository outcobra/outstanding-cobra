import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageDialog} from '../manage-dialog';
import {SemesterDto, SubjectDto} from '../model/ManageDto';
import {Util} from '../../shared/util/util';

@Component({
    selector: 'subject-dialog',
    templateUrl: './subject-dialog.component.html',
    styleUrls: ['./subject-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SubjectDialog extends ManageDialog<SubjectDto, SemesterDto> implements OnInit {

    private _subjectForm: FormGroup;

    constructor(private _dialogRef: MdDialogRef<SubjectDialog>,
                private _formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this._subjectForm = this._formBuilder.group({
                name: [this.getParamOrDefault('name'), Validators.required],
                color: [this.getParamOrDefault('color'), Validators.required]
            }
        );
    }

    public cancel() {
        this._dialogRef.close(null);
    }

    public submit() {
        if (!(this._subjectForm.valid && this._subjectForm.dirty)) {
            Util.revalidateForm(this._subjectForm);
            return;
        }
        if (this.isEditMode()) {
            this.param.name = this._subjectForm.get('name').value;
            this.param.color = this._subjectForm.get('color').value;
            this._dialogRef.close(this.param);
        } else {
            let value = this._subjectForm.value;
            value.semesterId = this.parent.id;
            this._dialogRef.close(value);
        }
    }

    get subjectForm(): FormGroup {
        return this._subjectForm;
    }
}
