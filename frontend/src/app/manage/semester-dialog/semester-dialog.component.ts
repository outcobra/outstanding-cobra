import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManageDialog} from '../manage-dialog';
import {SchoolYearDto, SemesterDto} from '../model/ManageDto';
import {OCValidators} from '../../shared/services/oc-validators';
import {TranslateService} from 'ng2-translate';
import {DatePipe} from '@angular/common';
import {Util} from '../../shared/util/util';

@Component({
    selector: 'semester-dialog',
    templateUrl: './semester-dialog.component.html',
    styleUrls: ['./semester-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SemesterDialog extends ManageDialog<SemesterDto, SchoolYearDto> implements OnInit {

    constructor(public dialogRef: MdDialogRef<SemesterDialog>,
                private formBuilder: FormBuilder,
                private translate: TranslateService,
                private datePipe: DatePipe) {
        super();
    }

    public semesterForm: FormGroup;

    ngOnInit() {
        this.semesterForm = this.formBuilder.group({
                name: [this.getParamOrDefault('name'), Validators.required],
                validFrom: [this.getParamOrDefault('validFrom'), Validators.compose([Validators.required, OCValidators.isAfterOrEqualDay(this.parent.validFrom)])],
                validTo: [this.getParamOrDefault('validTo'), Validators.compose([Validators.required, OCValidators.isBeforeOrEqualDay(this.parent.validTo)])]
            },
            {
                validator: OCValidators.dateFromIsBeforeDateTo
            }
        );
    }

    getErrorText(controlName: string, errorName: string, errorProp: string) {
        let control = this.semesterForm.get(controlName);
        let date = this.datePipe.transform(control.getError(errorName)[errorProp], 'dd.MM.y');
        return control.hasError(errorName) ? this.translate.instant(`i18n.common.form.error.${errorName}`, {'date': date}) : '';
    }

    onCancel() {
        this.dialogRef.close(null);
    }

    onSubmit() {
        if (this.semesterForm.valid && this.semesterForm.dirty) {
            let value = this.semesterForm.value as SemesterDto;
            value.schoolYearId = this.parent.id;
            this.dialogRef.close(value);
        }
        else {
            Util.revalidateForm(this.semesterForm);
        }
    }

}
