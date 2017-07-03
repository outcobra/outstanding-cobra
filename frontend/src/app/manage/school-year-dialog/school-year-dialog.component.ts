import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ParentLinkedCreateUpdateComponent} from '../../core/common/parent-linked-create-update-component';
import {SchoolClassDto, SchoolYearDto} from '../model/manage.dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import {OCValidators} from '../../core/services/oc-validators';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';
import {DateUtil} from '../../core/services/date-util.service';
import {FormUtil} from '../../core/util/form-util';

@Component({
    selector: 'school-year-dialog',
    templateUrl: './school-year-dialog.component.html',
    styleUrls: ['./school-year-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SchoolYearDialog extends ParentLinkedCreateUpdateComponent<SchoolYearDto, SchoolClassDto> implements OnInit {

    private _schoolYearForm: FormGroup;

    constructor(private _dialogRef: MdDialogRef<SchoolYearDialog>,
                private _formBuilder: FormBuilder,
                private _translate: TranslateService,
                private _datePipe: DatePipe,
                private responsiveHelperService: ResponsiveHelperService) {
        super();
    }

    ngOnInit() {
        this._schoolYearForm = this._formBuilder.group({
                name: [this.getParamOrDefault('name'), Validators.required],
                validFrom: [DateUtil.transformToDateIfPossible(this.getParamOrDefault('validFrom')), Validators.required],
                validTo: [DateUtil.transformToDateIfPossible(this.getParamOrDefault('validTo')), Validators.required]
            },
            {
                validator: OCValidators.dateFromIsBeforeDateTo()
            }
        );
    }

    public getErrorText(controlName: string, errorName: string, errorProp: string) {
        let control = this._schoolYearForm.get(controlName);
        let date = this._datePipe.transform(control.getError(errorName)[errorProp], 'dd.MM.y');
        return control.hasError(errorName) ? this._translate.instant(`i18n.common.form.error.${errorName}`, {'date': date}) : '';
    }

    public submit() {
        if (!(this._schoolYearForm.valid && this._schoolYearForm.dirty)) {
            FormUtil.revalidateForm(this._schoolYearForm);
            return;
        }
        if (this.isEditMode()) {
            this.param.name = this._schoolYearForm.get('name').value;
            this.param.validFrom = this._schoolYearForm.get('validFrom').value;
            this.param.validTo = this._schoolYearForm.get('validTo').value;
            this._dialogRef.close(this.param);
        } else {
            let value = this._schoolYearForm.value as SchoolYearDto;
            value.schoolClassId = this.parent.id;
            this._dialogRef.close(value);
        }
    }

    public isMobile() {
        return this.responsiveHelperService.isMobile();
    }

    get schoolYearForm(): FormGroup {
        return this._schoolYearForm;
    }
}
