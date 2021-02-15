
import {map} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, convertToParamMap, NavigationExtras, ParamMap, Router} from '@angular/router';
import {MarkDto} from '../model/mark.dto';
import {ViewMode} from '../../core/common/view-mode';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ParentLinkedCreateUpdateComponent} from '../../core/common/parent-linked-create-update-component';
import {MarkGroupDto} from '../model/mark-group.dto';
import {MARK_PATTERN, MarkService, WEIGHT_PATTERN} from '../service/mark.service';
import {FormUtil} from '../../core/util/form-util';
import {ConfirmDialogService} from '../../core/services/confirm-dialog.service';
import {getIfTruthy, isNotEmpty, isTrue} from '../../core/util/helper';
import {Observable} from 'rxjs';
import * as objectAssign from 'object-assign';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';

@Component({
    selector: 'mark-create-update',
    templateUrl: './mark-create-update.component.html',
    styleUrls: ['./mark-create-update.component.scss']
})
export class MarkCreateUpdateComponent extends ParentLinkedCreateUpdateComponent<MarkDto, MarkGroupDto> implements OnInit {
    private _markCreateUpdateForm: FormGroup;
    private _parentMarkGroupId: number;
    private _semesterId: number;
    private _examId: string;
    private _examName: string;
    private _navigationExtras: NavigationExtras;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _formBuilder: FormBuilder,
                private _confirmService: ConfirmDialogService,
                private _markService: MarkService,
                private _notificationService: NotificationWrapperService) {
        super();
    }

    ngOnInit() {
        Observable.combineLatest([
                this._route.params,
                this._route.queryParams
            ], (first, second) => convertToParamMap(objectAssign({}, first, second))
        ).subscribe((paramMap: ParamMap) => {
            this._examId = paramMap.get('examId');
            this._examName = paramMap.get('examName');
            this._semesterId = parseInt(paramMap.get('semesterId'));
            this._navigationExtras = {
                queryParams: {
                    subjectId: parseInt(paramMap.get('subjectId')),
                    groupId: this._parentMarkGroupId = parseInt(paramMap.get('groupId'))
                }
            };
        });
        this._route.data.subscribe((data: { isEdit: boolean, mark: MarkDto, parent: MarkGroupDto }) => {
            let isEdit = data.isEdit;
            this.initWithParent(isEdit ? ViewMode.EDIT : ViewMode.NEW,
                isEdit ? data.parent : null,
                isEdit ? data.mark : null);
        });
        this._markCreateUpdateForm = this._formBuilder.group({
            value: [this.getParamOrDefault('value'), Validators.compose([Validators.required, Validators.pattern(MARK_PATTERN)])],
            weight: [this.getParamOrDefault('weight', 1), Validators.compose([Validators.required, Validators.pattern(WEIGHT_PATTERN)])],
            description: [this.getParamOrDefault('description', getIfTruthy(this, '_examName', '')), Validators.required]
        });
    }

    public cancel() {
        if (this._markCreateUpdateForm.pristine) {
            this._goToSemesterView();
            return;
        }
        this._confirmService.open('i18n.common.dialog.unsavedChanges.title', 'i18n.common.dialog.unsavedChanges.message')
            .filter(isTrue)
            .map(() => Observable.fromPromise(this._goToSemesterView()))
            .filter(isTrue)
            .subscribe(() => this._notificationService.success('i18n.common.notification.success.save', 'i18n.modules.mark.createUpdate.notification.success.message'));
    }

    public submit() {
        if (this._markCreateUpdateForm.valid && this._markCreateUpdateForm.dirty) {
            this._markService.saveMark(this._formToMark(this._markCreateUpdateForm)).pipe(
                map(() => Observable.fromPromise(this._goToSemesterView())))
                .filter(isTrue)
                .subscribe(() => this._notificationService.success('i18n.common.notification.success.save', 'i18n.modules.mark.createUpdate.notification.success.message'));
        }
        else {
            FormUtil.revalidateForm(this._markCreateUpdateForm);
        }
    }

    private _goToSemesterView() {
        return this._router.navigate([`/mark/semester/${this._semesterId}`], this._navigationExtras);
    }

    private _formToMark(formGroup: FormGroup): MarkDto {
        let formValue = formGroup.value;
        return {
            id: this.isEditMode() && this.param.id ? this.param.id : null,
            value: formValue.value,
            weight: formValue.weight,
            description: formValue.description,
            examId: isNotEmpty(this._examId) ? parseInt(this._examId) : null,
            markGroupId: this._parentMarkGroupId
        } as MarkDto;
    }

    get markCreateUpdateForm(): FormGroup {
        return this._markCreateUpdateForm;
    }
}
