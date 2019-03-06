import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtil } from '../../../core/util/form-util';
import { SchoolClassDto } from '../../../core/model/manage/school-class.dto';
import { CreateUpdateComponent } from '../../../core/common/create-update-component';
import { SchoolClassService } from '../../../core/services/manage/school-class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewMode } from '../../../core/common/view-mode';

@Component({
    selector: 'school-class-create-update',
    templateUrl: './school-class-create-update.component.html',
    styleUrls: ['./school-class-create-update.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolClassCreateUpdateComponent extends CreateUpdateComponent<SchoolClassDto> implements OnInit {

    private _schoolClassForm: FormGroup;

    constructor(private _schoolClassService: SchoolClassService,
                private _formBuilder: FormBuilder,
                private _route: ActivatedRoute,
                private _router: Router) {
        super();
    }

    ngOnInit() {
        this._route.data.subscribe(({schoolClass, isEdit}: { schoolClass?: SchoolClassDto, isEdit: boolean }) => {
            if (isEdit) {
                this.init(ViewMode.EDIT, schoolClass);
            } else {
                this.init(ViewMode.NEW);
            }

            this._schoolClassForm = this._formBuilder.group({
                normalizedName: [this.getParamOrDefault('normalizedName'), Validators.required]
            });
        });
    }

    public submit() {
        if (!(this._schoolClassForm.valid && this._schoolClassForm.dirty)) {
            FormUtil.revalidateForm(this._schoolClassForm);
            return;
        }
        if (this.isEditMode()) {
            this.param.normalizedName = this._schoolClassForm.get('normalizedName').value;
            this._save(this.param);
        } else {
            let value = this._schoolClassForm.value as SchoolClassDto;
            this._save(value);
        }
    }

    private _save(schoolClass: SchoolClassDto) {
        let path = this.isEditMode() ? ['../..'] : ['..'];
        this._schoolClassService.create(schoolClass)
            .subscribe(() => this._router.navigate(path, {relativeTo: this._route}));
    }

    get schoolClassForm(): FormGroup {
        return this._schoolClassForm;
    }
}
