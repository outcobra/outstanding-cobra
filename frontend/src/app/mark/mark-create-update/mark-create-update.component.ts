import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MarkDto} from '../model/mark.dto';
import {ViewMode} from '../../core/common/view-mode';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentLinkedCreateUpdateComponent} from '../../core/common/parent-linked-create-update-component';
import {MarkGroupDto} from '../model/mark-group.dto';
import {MARK_PATTERN, MarkService, WEIGHT_PATTERN} from '../service/mark.service';
import {FormUtil} from '../../core/util/form-util';

@Component({
    selector: 'mark-create-update',
    templateUrl: './mark-create-update.component.html',
    styleUrls: ['./mark-create-update.component.scss']
})
export class MarkCreateUpdateComponent extends ParentLinkedCreateUpdateComponent<MarkDto, MarkGroupDto> implements OnInit {
    private _markCreateUpdateForm: FormGroup;
    private _parentMarkGroupId: number;
    private _semesterId: number;
    private _navigationExtras: NavigationExtras;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _formBuilder: FormBuilder,
                private _markService: MarkService) {
        super(_route.data['isEdit'] ? ViewMode.EDIT : ViewMode.NEW, _route.data['isEdit'] ? _route.params['mark'] : null, _route.data['isEdit'] ? _route.params['parent'] : null); // TODO improve this bullshit
        this._route.params.subscribe(params => {
            this._semesterId = parseInt(params['semesterId']);
            this._navigationExtras = {
                queryParams: {
                    subjectId: parseInt(params['subjectId']),
                    groupId: this._parentMarkGroupId = parseInt(params['groupId'])
                }
            };
        });
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
            this._markService.saveMark(this._formToMark(this._markCreateUpdateForm))
                .subscribe(() => {
                    this._router.navigate([`mark/semester/${this._semesterId}`], this._navigationExtras);
                });
        }
        else {
            FormUtil.revalidateForm(this._markCreateUpdateForm);
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
