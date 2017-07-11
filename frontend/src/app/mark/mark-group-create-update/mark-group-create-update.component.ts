import {Component, OnInit} from '@angular/core';
import {MarkGroupDto} from '../model/mark-group.dto';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MarkService, WEIGHT_PATTERN} from '../service/mark.service';
import {MarkDto} from '../model/mark.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {ParentLinkedCreateUpdateComponent} from '../../core/common/parent-linked-create-update-component';
import {Subject} from 'rxjs/Subject';
import {isNotNull} from '../../core/util/helper';
import {Util} from '../../core/util/util';
import {FormUtil} from '../../core/util/form-util';
import {ViewMode} from '../../core/common/view-mode';

@Component({
    selector: 'mark-group-create-update',
    templateUrl: './mark-group-create-update.component.html',
    styleUrls: ['./mark-group-create-update.component.scss']
})
export class MarkGroupCreateUpdateComponent extends ParentLinkedCreateUpdateComponent<MarkGroupDto, MarkGroupDto> implements OnInit {
    private _markGroupCreateUpdateForm: FormGroup;
    private _semesterId: number;

    private _availableMarks: Array<MarkDto>;
    private _selectedMarks: Array<MarkDto> = [];

    public newMark$: Subject<number> = new Subject();
    public removeMark$: Subject<string> = new Subject();

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _formBuilder: FormBuilder,
                private _markService: MarkService) {
        super()
    }

    ngOnInit() {
        this._route.paramMap.subscribe((map) => this._semesterId = parseInt(map.get('semesterId')));
        this._route.data.subscribe((marks: { subjectMarkGroup: MarkGroupDto, isEdit: boolean, markGroup?: MarkGroupDto }) => {
                let isEdit = marks.isEdit;
                this.initWithParent(isEdit ? ViewMode.EDIT : ViewMode.NEW, marks.subjectMarkGroup, isEdit ? marks.markGroup : null);
                this._availableMarks = marks.subjectMarkGroup.markValues;
                let groupValues = this.getParamOrDefault('markValues', []) as Array<MarkDto>;

                this._markGroupCreateUpdateForm = this._formBuilder.group({
                    weight: [this.getParamOrDefault('weight'), Validators.compose([Validators.required, Validators.pattern(WEIGHT_PATTERN)])],
                    description: [this.getParamOrDefault('description'), Validators.required],
                    selectedMarks: this._formBuilder.array(groupValues.map(this._constructSelectControl, this))
                });
            }
        );

        this.newMark$
            .filter(isNotNull)
            .subscribe(mark => {
                this.selectedMarkControls.push(this._constructSelectControl(mark));
                this.selectedMarkControls.markAsDirty();
                this._selectedMarks.push(mark);
            });

        this.removeMark$
            .map(this._getMarkFormControlByName, this)
            .filter(isNotNull)
            .subscribe(formControl => {
                Util.removeItem(this._selectedMarks, formControl.value);
                FormUtil.removeControlInArray(this.selectedMarkControls, formControl);
            });
    }

    public getAvailableMarks(formControlName?: string): Array<MarkDto> {
        let availableMarks = Util.removeItems(Util.cloneArray(this._availableMarks), this._selectedMarks);
        if (isNotNull(formControlName)) {
            let formControl = this._getMarkFormControlByName(formControlName);
            availableMarks.push(formControl.value as MarkDto);
        }
        return availableMarks;
    }

    public hasMarksLeft() {
        return (this._markGroupCreateUpdateForm.get('selectedMarks') as FormArray).length === this._availableMarks.length;
    }

    private _getMarkFormControlByName(formControlName: string): AbstractControl | null {
        return this._markGroupCreateUpdateForm.get(`selectedMarks.${formControlName}`);
    }

    private _formToMarkGroup(formGroup: FormGroup): MarkGroupDto {
        let formValue = formGroup.value;
        return {
            id: this.isEditMode() && this.param.id ? this.param.id : null,
            weight: formValue.weight,
            description: formValue.description,
            markValues: formValue.selectedMarks,
            parentGroupId: this.parent.id,
            value: null,
            subjectId: 0,
            markGroups: []
        } as MarkGroupDto;
    }

    public submit() {
        if (this._markGroupCreateUpdateForm.valid && this._markGroupCreateUpdateForm.dirty) {
            this._markService.saveMarkGroup(this._formToMarkGroup(this._markGroupCreateUpdateForm))
                .subscribe(() => {
                    this._router.navigate([`mark/semester/${this._semesterId}`]);
                });
        }
        else {
            FormUtil.revalidateForm(this._markGroupCreateUpdateForm);
        }
    }

    private _constructSelectControl(mark: MarkDto): FormControl {
        return this._formBuilder.control(mark, Validators.required);
    }

    get selectedMarkControls(): FormArray {
        return this._markGroupCreateUpdateForm.get('selectedMarks') as FormArray;
    }

    get availableMarks(): Array<MarkDto> {
        return this._availableMarks;
    }

    get markGroupCreateUpdateForm(): FormGroup {
        return this._markGroupCreateUpdateForm;
    }
}
