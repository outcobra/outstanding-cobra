import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OCValidators} from '../../../core/services/oc-validators';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {ResponsiveHelperService} from '../../../core/services/ui/responsive-helper.service';
import {DateUtil} from '../../../core/services/date-util.service';
import {FormUtil} from '../../../core/util/form-util';
import {SchoolYearDto} from '../../../core/model/manage/school-year.dto';
import {SchoolYearService} from '../../../core/services/manage/school-year.service';
import {CreateUpdateComponent} from '../../../core/common/create-update-component';

@Component({
    selector: 'school-year-create-update',
    templateUrl: './school-year-create-update.component.html',
    styleUrls: ['./school-year-create-update.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolYearCreateUpdateComponent extends CreateUpdateComponent<SchoolYearDto> implements OnInit {

    private _schoolYearForm: FormGroup;

    constructor(private _schoolYearService: SchoolYearService,
                private _formBuilder: FormBuilder,
                private _translate: TranslateService,
                private _datePipe: DatePipe,
                private responsiveHelperService: ResponsiveHelperService) {
        super();
    }

    ngOnInit() {
        this._schoolYearForm = this._formBuilder.group({
                name: [this.getParamOrDefault('name'), Validators.required],
                validFrom: [DateUtil.transformToMomentIfPossible(this.getParamOrDefault('validFrom')),
                    Validators.compose([Validators.required, OCValidators.date()])],
                validTo: [DateUtil.transformToMomentIfPossible(this.getParamOrDefault('validTo')),
                    Validators.compose([Validators.required, OCValidators.date()])]
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
            this._saveAndClose(this.param);
        } else {
            let value = this._schoolYearForm.value as SchoolYearDto;
            //value.schoolClassId = this.parent.id;
            this._saveAndClose(value);
        }
    }

    public isMobile() {
        return this.responsiveHelperService.isMobile();
    }

    private _saveAndClose(schoolYear: SchoolYearDto) {
        this._schoolYearService.save(schoolYear)
    }

    get schoolYearForm(): FormGroup {
        return this._schoolYearForm;
    }
}
