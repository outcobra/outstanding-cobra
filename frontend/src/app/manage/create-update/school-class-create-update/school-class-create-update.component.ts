import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormUtil} from '../../../core/util/form-util';
import {SchoolClassDto} from '../../../core/model/manage/school-class.dto';
import {CreateUpdateComponent} from '../../../core/common/create-update-component';
import {SchoolClassService} from '../../../core/services/manage/school-class.service';

@Component({
    selector: 'school-class-create-update',
    templateUrl: './school-class-create-update.component.html',
    styleUrls: ['./school-class-create-update.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolClassCreateUpdateComponent extends CreateUpdateComponent<SchoolClassDto> implements OnInit {

    private _schoolClassForm: FormGroup;

    constructor(private _schoolClassService: SchoolClassService,
                private _formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this._schoolClassForm = this._formBuilder.group({
            normalizedName: [this.getParamOrDefault('normalizedName'), Validators.required]
        });
    }

    public submit() {
        if (!(this._schoolClassForm.valid && this._schoolClassForm.dirty)) {
            FormUtil.revalidateForm(this._schoolClassForm);
            return;
        }
        if (this.isEditMode()) {
            this.param.normalizedName = this._schoolClassForm.get('normalizedName').value;
            this._saveAndClose(this.param);
        } else {
            let value = this._schoolClassForm.value as SchoolClassDto;
            this._saveAndClose(value);
        }
    }

    private _saveAndClose(schoolClass: SchoolClassDto) {
        this._schoolClassService.create(schoolClass);
    }

    get schoolClassForm(): FormGroup {
        return this._schoolClassForm;
    }
}
