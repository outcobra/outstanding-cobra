import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentLinkedCreateUpdateComponent} from '../../core/common/parent-linked-create-update-component';
import {SchoolYearDto, SemesterDto} from '../model/manage.dto';
import {OCValidators} from '../../core/services/oc-validators';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';
import {DateUtil} from '../../core/services/date-util.service';
import {FormUtil} from '../../core/util/form-util';
import {Moment} from 'moment';
import {SemesterService} from '../service/semester.service';

@Component({
    selector: 'semester-dialog',
    templateUrl: './semester-dialog.component.html',
    styleUrls: ['./semester-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SemesterDialog extends ParentLinkedCreateUpdateComponent<SemesterDto, SchoolYearDto> implements OnInit {

    private _semesterForm: FormGroup;

    constructor(private _dialogRef: MatDialogRef<SemesterDialog>,
                private _semesterService: SemesterService,
                private _formBuilder: FormBuilder,
                private _translate: TranslateService,
                private _datePipe: DatePipe,
                private responsiveHelperService: ResponsiveHelperService) {
        super();
    }

    ngOnInit() {
        this._semesterForm = this._formBuilder.group({
                name: [this.getParamOrDefault('name'), Validators.required],
                validFrom: [
                    DateUtil.transformToMomentIfPossible(this.getParamOrDefault('validFrom')),
                    Validators.compose([Validators.required, OCValidators.isAfterOrSameDay(this.parentValidFrom), OCValidators.isBeforeOrSameDay(this.parentValidTo), OCValidators.date()])
                ],
                validTo: [
                    DateUtil.transformToMomentIfPossible(this.getParamOrDefault('validTo')),
                    Validators.compose([Validators.required, OCValidators.isBeforeOrSameDay(this.parentValidTo), OCValidators.isAfterOrSameDay(this.parentValidFrom), OCValidators.date()])
                ]
            },
            {
                validator: OCValidators.dateFromIsBeforeDateTo()
            }
        );
    }

    public getErrorText(controlName: string, errorName: string, errorProp: string) {
        let control = this._semesterForm.get(controlName);
        let date = this._datePipe.transform(control.getError(errorName)[errorProp], 'dd.MM.y');
        return control.hasError(errorName) ? this._translate.instant(`i18n.common.form.error.${errorName}`, {'date': date}) : '';
    }

    public submit() {
        if (!(this._semesterForm.valid && this._semesterForm.dirty)) {
            FormUtil.revalidateForm(this._semesterForm);
            return;
        }
        if (this.isEditMode()) {
            this.param.name = this._semesterForm.get('name').value;
            this.param.validFrom = this._semesterForm.get('validFrom').value;
            this.param.validTo = this._semesterForm.get('validTo').value;
            this._saveAndClose(this.param);
        } else {
            let value = this._semesterForm.value as SemesterDto;
            value.schoolYearId = this.parent.id;
            this._saveAndClose(value)
        }
    }

    public isMobile() {
        return this.responsiveHelperService.isMobile();
    }

    private _saveAndClose(semester: SemesterDto) {
        this._semesterService.save(semester)
            .subscribe(result => this._dialogRef.close(result));
    }

    get parentValidFrom(): Moment {
        return DateUtil.transformToMomentIfPossible(this.parent.validFrom);
    }

    get parentValidTo(): Moment {
        return DateUtil.transformToMomentIfPossible(this.parent.validTo);
    }

    get semesterForm(): FormGroup {
        return this._semesterForm;
    }
}
