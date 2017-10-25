import {Component, OnInit, ViewChild} from '@angular/core';
import {MarkGroupDto} from '../model/mark-group.dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MarkService, WEIGHT_PATTERN} from '../service/mark.service';
import {MarkDto} from '../model/mark.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {ParentLinkedCreateUpdateComponent} from '../../core/common/parent-linked-create-update-component';
import {Subject} from 'rxjs/Subject';
import {isEmpty, isNotEmpty, isNotNull, isTrue} from '../../core/util/helper';
import {Util} from '../../core/util/util';
import {FormUtil} from '../../core/util/form-util';
import {ViewMode} from '../../core/common/view-mode';
import {ConfirmDialogService} from '../../core/services/confirm-dialog.service';
import {MatSelect} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';

@Component({
    selector: 'mark-group-create-update',
    templateUrl: './mark-group-create-update.component.html',
    styleUrls: ['./mark-group-create-update.component.scss']
})
export class MarkGroupCreateUpdateComponent extends ParentLinkedCreateUpdateComponent<MarkGroupDto, MarkGroupDto> implements OnInit {
    private _navigationExtras: {
        queryParams: {
            subjectId: number;
            groupId?: number;
        };
    };
    private _markGroupCreateUpdateForm: FormGroup;
    private _semesterId: number;

    private _availableMarks: Array<MarkDto>;
    private _selectedMarks: Array<MarkDto> = [];

    public newMark$: Subject<number> = new Subject();
    public removeMark$: Subject<string> = new Subject();

    @ViewChild('markSelect') select: MatSelect;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _formBuilder: FormBuilder,
                private _confirmService: ConfirmDialogService,
                private _markService: MarkService,
                private _notificationService: NotificationWrapperService) {
        super()
    }

    ngOnInit() {
        this._route.paramMap.subscribe(paramMap => {
            this._semesterId = parseInt(paramMap.get('semesterId'));
            this._navigationExtras = {
                queryParams: {
                    subjectId: parseInt(paramMap.get('subjectId'))
                }
            };
        });

        this._route.data.subscribe((marks: { subjectMarkGroup: MarkGroupDto, isEdit: boolean, markGroup?: MarkGroupDto }) => {
                let isEdit = marks.isEdit;
                this.initWithParent((isEdit ? ViewMode.EDIT : ViewMode.NEW), marks.subjectMarkGroup, isEdit ? marks.markGroup : null);
                this._availableMarks = marks.subjectMarkGroup.markValues;
                this._selectedMarks = this.getParamOrDefault('markValues', []) as Array<MarkDto>;
                if (isEdit) {
                    this._navigationExtras.queryParams.groupId = this.param.id;
                }

                this._markGroupCreateUpdateForm = this._formBuilder.group({
                    weight: [this.getParamOrDefault('weight'), Validators.compose([Validators.required, Validators.pattern(WEIGHT_PATTERN)])],
                    description: [this.getParamOrDefault('description'), Validators.required]
                });
            }
        );

        this.newMark$
            .filter(isNotNull)
            .subscribe(mark => {
                Util.removeItem(this._availableMarks, mark);
                this._selectedMarks.push(mark);
                this._markGroupCreateUpdateForm.markAsDirty();
                if (isEmpty(this._availableMarks)) {
                    this.select.writeValue(0);
                }
            });

        this.removeMark$
            .filter(isNotNull)
            .subscribe(mark => {
                Util.removeItem(this._selectedMarks, mark);
                this._availableMarks.push(mark);
                this._markGroupCreateUpdateForm.markAsDirty();
            });
    }

    public hasMarksLeft() {
        return isNotEmpty(this._availableMarks);
    }

    public cancel() {
        if (this._markGroupCreateUpdateForm.pristine) {
            this._goToSemesterView();
            return;
        }
        this._confirmService.open('i18n.common.dialog.unsavedChanges.title', 'i18n.common.dialog.unsavedChanges.message')
            .filter(isTrue)
            .subscribe(() => this._goToSemesterView());
    }

    public submit() {
        if (this._markGroupCreateUpdateForm.valid && this._markGroupCreateUpdateForm.dirty) {
            this._markService.saveMarkGroup(this._formToMarkGroup(this._markGroupCreateUpdateForm))
                .map(() => Observable.fromPromise(this._goToSemesterView()))
                .filter(isTrue)
                .subscribe(() => this._notificationService.success('i18n.common.notification.success.save', 'i18n.modules.mark.group.createUpdate.notification.success.message'));
        }
        else {
            FormUtil.revalidateForm(this._markGroupCreateUpdateForm);
        }
    }

    private _formToMarkGroup(formGroup: FormGroup): MarkGroupDto {
        let formValue = formGroup.value;
        return {
            id: this.isEditMode() && this.param.id ? this.param.id : null,
            weight: formValue.weight,
            description: formValue.description,
            markValues: this._selectedMarks,
            parentGroupId: this.parent.id,
            value: this.isEditMode() ? this.param.value : null,
            subjectId: 0,
            markGroups: []
        } as MarkGroupDto;
    }

    private _goToSemesterView(): Promise<boolean> {
        return this._router.navigate([`/app/mark/semester/${this._semesterId}`], this._navigationExtras);
    }

    get selectedMarks(): Array<MarkDto> {
        return this._selectedMarks;
    }

    get availableMarks(): Array<MarkDto> {
        return this._availableMarks;
    }

    get markGroupCreateUpdateForm(): FormGroup {
        return this._markGroupCreateUpdateForm;
    }
}
