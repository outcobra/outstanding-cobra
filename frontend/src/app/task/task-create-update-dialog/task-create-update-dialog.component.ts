import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import {SubjectService} from '../../manage/service/subject.service';
import {SubjectDto} from '../../manage/model/ManageDto';
import {Util} from '../../core/util/util';
import {OCValidators} from '../../core/services/oc-validators';
import {Task} from '../model/Task';
import {CreateUpdateDialog} from '../../common/CreateUpdateDialog';

@Component({
    selector: './task-create-update-dialog',
    templateUrl: './task-create-update-dialog.component.html',
    styleUrls: ['./task-create-update-dialog.component.scss']
})
export class TaskCreateUpdateDialog extends CreateUpdateDialog<Task> implements OnInit {
    private _taskCreateUpdateForm: FormGroup;
    private _subjects: SubjectDto[];
    private _today: Date = new Date();

    constructor(private _subjectService: SubjectService,
                private _dialogRef: MdDialogRef<TaskCreateUpdateDialog>,
                private _formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this._subjectService.getCurrentSubjects()
            .subscribe((subjects: SubjectDto[]) => this._subjects = subjects);

        this._taskCreateUpdateForm = this._formBuilder.group({
            name: [this.getParamOrDefault('name'), Validators.required],
            description: [this.getParamOrDefault('description')],
            dates: this._formBuilder.group({
                    todoDate: [this.getParamOrDefault('todoDate'), Validators.required],
                    dueDate: [this.getParamOrDefault('dueDate'), Validators.required],
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
            Util.revalidateForm(this._taskCreateUpdateForm);
        }
    }

    private _formToTask(formGroup: FormGroup): Task {
        let formValue = formGroup.value;
        return {
            id: this.isEditMode() && this.param.id ? this.param.id : null,
            name: formValue.name,
            description: formValue.description,
            todoDate: formValue.dates.todoDate,
            dueDate: formValue.dates.dueDate,
            effort: formValue.effort,
            progress: 0,
            subject: this._subjects.find(subject => subject.id == formValue.subjectId)
        } as Task
    }


    get taskCreateUpdateForm(): FormGroup {
        return this._taskCreateUpdateForm;
    }

    get subjects(): SubjectDto[] {
        return this._subjects;
    }

    get today(): Date {
        return this._today;
    }
}
