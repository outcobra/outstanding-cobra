import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarkDto} from '../model/mark.dto';
import {ViewMode} from '../../core/common/view-mode';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentLinkedCreateUpdateComponent} from '../../core/common/parent-linked-create-update-component';
import {MarkGroupDto} from '../model/mark-group.dto';

const MARK_PATTERN: RegExp = /^(([1-5](\.[0-9]{1,2})?)|6(\.00?)?)$/;
const WEIGHT_PATTERN: RegExp = /^(([0-9](\.[0-9])?)|10(\.00?)?)$/;

@Component({
    selector: 'mark-create-update',
    templateUrl: './mark-create-update.component.html',
    styleUrls: ['./mark-create-update.component.scss']
})
export class MarkCreateUpdateComponent extends ParentLinkedCreateUpdateComponent<MarkDto, MarkGroupDto> implements OnInit {
    private _markCreateUpdateForm: FormGroup;

    constructor(private _route: ActivatedRoute,
                private _formBuilder: FormBuilder) {
        super(_route.data['isEdit'] ? ViewMode.EDIT : ViewMode.NEW, _route.data['isEdit'] ? _route.data['mark'] : null, _route.data['isEdit'] ? _route.data['parent'] : null); // TODO improve this bullshit
    }

    ngOnInit() {
        this._markCreateUpdateForm = this._formBuilder.group({
            value: [this.getParamOrDefault('value'), Validators.compose([Validators.required, Validators.pattern(MARK_PATTERN)])],
            weight: [this.getParamOrDefault('weight', 1), Validators.compose([Validators.required, Validators.pattern(WEIGHT_PATTERN)])],
            description: [this.getParamOrDefault('description'), Validators.required]
        });
    }

    public submit() {
        console.log(this.markCreateUpdateForm);
    }


    get markCreateUpdateForm(): FormGroup {
        return this._markCreateUpdateForm;
    }
}
