import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ManageDialog} from '../manage-dialog';
import {SchoolClassDto, SchoolYearDto} from '../model/ManageDto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import {OCValidators} from '../../shared/services/oc-validators';
import {TranslateService} from 'ng2-translate';
import {DatePipe} from '@angular/common';
import {Util} from '../../shared/util/util';

@Component({
    selector: 'school-year-dialog',
    templateUrl: './school-year-dialog.component.html',
    styleUrls: ['./school-year-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SchoolYearDialog extends ManageDialog<SchoolYearDto, SchoolClassDto> implements OnInit {

    private _schoolYearForm: FormGroup;

    constructor(private _dialogRef: MdDialogRef<SchoolYearDialog>,
                private _formBuilder: FormBuilder,
                private _translate: TranslateService,
                private _datePipe: DatePipe) {
        super();
    }

    ngOnInit() {
        this._schoolYearForm = this._formBuilder.group({
                name: [this.getParamOrDefault('name'), Validators.required],
                validFrom: [this.getParamOrDefault('validFrom'), Validators.required],
                validTo: [this.getParamOrDefault('validTo'), Validators.required]
            },
            {
                validator: OCValidators.dateFromIsBeforeDateTo
            }
        );
    }

    public getErrorText(controlName: string, errorName: string, errorProp: string) {
        let control = this._schoolYearForm.get(controlName);
        let date = this._datePipe.transform(control.getError(errorName)[errorProp], 'dd.MM.y');
        return control.hasError(errorName) ? this._translate.instant(`i18n.common.form.error.${errorName}`, {'date': date}) : '';
    }

    public cancel() {
        this._dialogRef.close(null);
    }

    public submit() {
        if (this._schoolYearForm.valid && this._schoolYearForm.dirty) {
            let value = this._schoolYearForm.value as SchoolYearDto;
            value.schoolClassId = this.parent.id;
            this._dialogRef.close(value);
        }
        else {
            Util.revalidateForm(this._schoolYearForm);
        }
    }


    get schoolYearForm(): FormGroup {
        return this._schoolYearForm;
    }
}
