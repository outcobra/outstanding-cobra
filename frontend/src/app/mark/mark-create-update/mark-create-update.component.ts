import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarkDto} from '../model/mark.dto';
import {ViewMode} from '../../core/common/view-mode';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentLinkedCreateUpdateComponent} from '../../core/common/parent-linked-create-update-component';
import {MarkGroupDto} from '../model/mark-group.dto';
import {Util} from '../../core/util/util';
import {MarkService} from '../service/mark.service';

const MARK_PATTERN: RegExp = /^(([1-5](\.[0-9]{1,2})?)|6(\.00?)?)$/;
const WEIGHT_PATTERN: RegExp = /^(([0-9](\.[0-9])?)|10(\.00?)?)$/;

@Component({
    selector: 'mark-create-update',
    templateUrl: './mark-create-update.component.html',
    styleUrls: ['./mark-create-update.component.scss']
})
export class MarkCreateUpdateComponent extends ParentLinkedCreateUpdateComponent<MarkDto, MarkGroupDto> implements OnInit {
    private _markCreateUpdateForm: FormGroup;
    private _parentMarkGroupId: number;

    constructor(private _route: ActivatedRoute,
                private _formBuilder: FormBuilder,
                private _markService: MarkService) {
        super(_route.data['isEdit'] ? ViewMode.EDIT : ViewMode.NEW, _route.data['isEdit'] ? _route.params['mark'] : null, _route.data['isEdit'] ? _route.params['parent'] : null); // TODO improve this bullshit
        this._parentMarkGroupId = this._route.params['groupId'];
    }

    ngOnInit() {
        this._markCreateUpdateForm = this._formBuilder.group({
            value: [this.getParamOrDefault('value'), Validators.compose([Validators.required, Validators.pattern(MARK_PATTERN)])],
            weight: [this.getParamOrDefault('weight', 1), Validators.compose([Validators.required, Validators.pattern(WEIGHT_PATTERN)])],
            description: [this.getParamOrDefault('description'), Validators.required]
        });
    }

    public submit() {
        if (this._markCreateUpdateForm.valid && this._markCreateUpdateForm.dirty) {
            this._markService.saveMark(this._formToMark(this._markCreateUpdateForm));
        }
        else {
            Util.revalidateForm(this._markCreateUpdateForm);
        }
    }

    private _formToMark(formGroup: FormGroup): MarkDto {
        let formValue = formGroup.value;
        return {
            id: this.isEditMode() && this.param.id ? this.param.id : null,
            value: formValue.value,
            weight: formValue.weight,
            description: formValue.description,
            markGroupId: this._parentMarkGroupId
        } as MarkDto;
    }


    get markCreateUpdateForm(): FormGroup {
        return this._markCreateUpdateForm;
    }
}
