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

    public schoolYearForm: FormGroup;

    constructor(public dialogRef: MdDialogRef<SchoolYearDialog>,
                private formBuilder: FormBuilder,
                private translate: TranslateService,
                private datePipe: DatePipe) {
        super();
    }

    ngOnInit() {
        this.schoolYearForm = this.formBuilder.group({
                name: [this.getParamOrDefault('name'), Validators.required],
                validFrom: [this.getParamOrDefault('validFrom'), Validators.required],
                validTo: [this.getParamOrDefault('validTo'), Validators.required]
            },
            {
                validator: OCValidators.dateFromIsBeforeDateTo
            }
        );
    }

    getErrorText(controlName: string, errorName: string, errorProp: string) {
        let control = this.schoolYearForm.get(controlName);
        let date = this.datePipe.transform(control.getError(errorName)[errorProp], 'dd.MM.y');
        return control.hasError(errorName) ? this.translate.instant(`i18n.common.form.error.${errorName}`, {'date': date}) : '';
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    onSubmit() {
        if (this.schoolYearForm.valid && this.schoolYearForm.dirty) {
            let value = this.schoolYearForm.value as SchoolYearDto;
            value.schoolClassId = this.parent.id;
            this.dialogRef.close(value);
        }
        else {
            Util.revalidateForm(this.schoolYearForm);
        }
    }

}
