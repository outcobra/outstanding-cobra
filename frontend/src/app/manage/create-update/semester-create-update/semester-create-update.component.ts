import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentLinkedCreateUpdateComponent} from '../../../core/common/parent-linked-create-update-component';
import {OCValidators} from '../../../core/services/oc-validators';
import {TranslateService} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';
import {ResponsiveHelperService} from '../../../core/services/ui/responsive-helper.service';
import {DateUtil} from '../../../core/services/date-util.service';
import {FormUtil} from '../../../core/util/form-util';
import {Moment} from 'moment';
import { SchoolYearDto } from '../../../core/model/manage/school-year.dto';
import { SemesterService } from '../../../core/services/manage/semester.service';
import { SemesterDto } from '../../../core/model/manage/semester.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewMode } from '../../../core/common/view-mode';

@Component({
    selector: 'semester-dialog',
    templateUrl: './semester-create-update.component.html',
    styleUrls: ['./semester-create-update.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SemesterCreateUpdateComponent extends ParentLinkedCreateUpdateComponent<SemesterDto, SchoolYearDto> implements OnInit {

    private _semesterForm: FormGroup;

    constructor(private _semesterService: SemesterService,
                private _formBuilder: FormBuilder,
                private _translate: TranslateService,
                private _datePipe: DatePipe,
                private responsiveHelperService: ResponsiveHelperService,
                private _route: ActivatedRoute,
                private _router: Router) {
        super();
    }

    ngOnInit() {
        this._route.data.subscribe(({semester, schoolYear, isEdit}: { semester?: SemesterDto, schoolYear?: SchoolYearDto, isEdit: boolean }) => {
            if (isEdit) {
                this.initWithParent(ViewMode.EDIT, schoolYear, semester);
            } else {
                this.initWithParent(ViewMode.NEW, schoolYear);
            }

            this._semesterForm = this._formBuilder.group({
                    name: [this.getParamOrDefault('name'), Validators.required],
                    validFrom: [
                        DateUtil.transformToMomentIfPossible(this.getParamOrDefault('validFrom')),
                        Validators.compose([
                            Validators.required,
                            OCValidators.date(),
                            OCValidators.isAfterOrSameDay(this.parentValidFrom),
                            OCValidators.isBeforeOrSameDay(this.parentValidTo),
                        ])
                    ],
                    validTo: [
                        DateUtil.transformToMomentIfPossible(this.getParamOrDefault('validTo')),
                        Validators.compose([
                            Validators.required,
                            OCValidators.date(),
                            OCValidators.isBeforeOrSameDay(this.parentValidTo),
                            OCValidators.isAfterOrSameDay(this.parentValidFrom),
                        ])
                    ]
                },
                {
                    validator: OCValidators.dateFromIsBeforeDateTo()
                }
            );
        });
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
        let value = this._semesterForm.value as SemesterDto;

        if (this.isEditMode()) {
            value = Object.assign(this.param, value);
        } else {
            value.schoolYearId = this.parent.id;
        }
        this._save(value);
    }

    public isMobile() {
        return this.responsiveHelperService.isMobile();
    }

    private _save(semester: SemesterDto) {
        this._semesterService.save(semester)
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
