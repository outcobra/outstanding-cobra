import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {OCValidators} from '../../core/services/oc-validators';
import {TaskDto} from '../model/task.dto';
import {CreateUpdateComponent} from '../../core/common/create-update-component';
import {ResponsiveHelperService} from '../../core/services/ui/responsive-helper.service';
import {DateUtil} from '../../core/services/date-util.service';
import {FormUtil} from '../../core/util/form-util';
import * as moment from 'moment';
import {Moment} from 'moment';
import {SchoolClassSubjectDto} from '../model/school-class-subject.dto';
import {SchoolClassSubjectService} from '../../core/services/school-class-subject/school-class-subject.service';

@Component({
    selector: './task-create-update-dialog',
    templateUrl: './task-create-update-dialog.component.html',
    styleUrls: ['./task-create-update-dialog.component.scss']
})
export class TaskCreateUpdateDialog extends CreateUpdateComponent<TaskDto> implements OnInit {
    private _taskCreateUpdateForm: FormGroup;
    private _schoolClassSubjects: SchoolClassSubjectDto;
    private _today: Moment = moment();

    constructor(private _schoolClassSubjectService: SchoolClassSubjectService,
                private _dialogRef: MatDialogRef<TaskCreateUpdateDialog>,
                private _formBuilder: FormBuilder,
                private responsiveHelperService: ResponsiveHelperService) {
        super();
    }

    ngOnInit() {
        this._schoolClassSubjectService.getSchoolCLassSubjects()
            .subscribe((subjects: SchoolClassSubjectDto) => this._schoolClassSubjects = subjects);

        this._taskCreateUpdateForm = this._formBuilder.group({
            name: [this.getParamOrDefault('name'), Validators.required],
            description: [this.getParamOrDefault('description')],
            dates: this._formBuilder.group({
                    todoDate: [DateUtil.transformToMomentIfPossible(this.getParamOrDefault('todoDate')),
                        Validators.compose([Validators.required, OCValidators.date()])],
                    dueDate: [DateUtil.transformToMomentIfPossible(this.getParamOrDefault('dueDate')),
                        Validators.compose([Validators.required, OCValidators.date()])]
                },
                {
                    validator: OCValidators.dateFromIsBeforeDateTo('todoDate', 'dueDate', true)
                }),
            effort: [this.getParamOrDefault('effort'), Validators.required],
            subjectId: [this.getParamOrDefault('subject.id'), Validators.required]
        });
    }

    public submit() {
        if (this._taskCreateUpdateForm.valid && this._taskCreateUpdateForm.dirty) {
            this._dialogRef.close(this._formToTask(this._taskCreateUpdateForm));
        }
        else {
            FormUtil.revalidateForm(this._taskCreateUpdateForm);
        }
    }

    private _formToTask(formGroup: FormGroup): TaskDto {
        let formValue = formGroup.value;
        return {
            id: this.isEditMode() && this.param.id ? this.param.id : null,
            name: formValue.name,
            description: formValue.description,
            todoDate: formValue.dates.todoDate,
            dueDate: formValue.dates.dueDate,
            effort: formValue.effort,
            progress: 0,
            //TODO @mario map value
        } as TaskDto
    }

    public isMobile() {
        return this.responsiveHelperService.isMobile();
    }

    get taskCreateUpdateForm(): FormGroup {
        return this._taskCreateUpdateForm;
    }

    get schoolClassSubjects(): SchoolClassSubjectDto {
        return this._schoolClassSubjects;
    }

    get today(): Moment {
        return this._today;
    }
}
