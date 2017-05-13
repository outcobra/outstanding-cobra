import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageDialog} from '../manage-dialog';
import {SchoolYearDto, SemesterDto} from '../model/ManageDto';
import {OCValidators} from '../../shared/services/oc-validators';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {Util} from '../../shared/util/util';
import {DialogMode} from '../../common/DialogMode';

@Component({
               selector: 'semester-dialog',
               templateUrl: './semester-dialog.component.html',
               styleUrls: [ './semester-dialog.component.scss' ],
               encapsulation: ViewEncapsulation.None
           })
export class SemesterDialog extends ManageDialog<SemesterDto, SchoolYearDto> implements OnInit {

    private _semesterForm: FormGroup;

    constructor(private _dialogRef: MdDialogRef<SemesterDialog>,
                private _formBuilder: FormBuilder,
                private _translate: TranslateService,
                private _datePipe: DatePipe) {
        super();
    }

    ngOnInit() {
        this._semesterForm = this._formBuilder.group({
                name: [this.getParamOrDefault('name'), Validators.required],
                validFrom: [this.getParamOrDefault('validFrom'), Validators.compose([Validators.required, OCValidators.isAfterOrEqualDay(this.parent.validFrom)])],
                validTo: [this.getParamOrDefault('validTo'), Validators.compose([Validators.required, OCValidators.isBeforeOrEqualDay(this.parent.validTo)])]
            },
            {
                validator: OCValidators.dateFromIsBeforeDateTo
            }
        );
    }

    public getErrorText(controlName: string, errorName: string, errorProp: string) {
        let control = this._semesterForm.get(controlName);
        let date = this._datePipe.transform(control.getError(errorName)[ errorProp ], 'dd.MM.y');
        return control.hasError(errorName) ? this._translate.instant(`i18n.common.form.error.${errorName}`, {'date': date}) : '';
    }

    public cancel() {
        this._dialogRef.close(null);
    }

    public submit() {
        if (this._semesterForm.valid && this._semesterForm.dirty) {
            let value = this._semesterForm.value as SemesterDto;
            value.schoolYearId = this.parent.id;
            if (this.mode == DialogMode.EDIT) {
                value.id = this.param.id
            }
            this._dialogRef.close(value);
        }
        else {
            Util.revalidateForm(this._semesterForm);
        }
    }

    get semesterForm(): FormGroup {
        return this._semesterForm;
    }
}
