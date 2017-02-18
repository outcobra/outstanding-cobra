import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MdDialogRef} from '@angular/material';
import {SubjectService} from '../../manage/service/subject.service';
import {SubjectDto} from '../../manage/model/ManageDto';
import {Util} from '../../shared/services/util';
import {OutcobraValidators} from '../../shared/services/outcobra-validators';
import {Task} from '../model/Task';
import {CreateUpdateDialog} from '../../common/CreateUpdateDialog';
import {DialogMode} from '../../common/DialogMode';

@Component({
    selector: './task-create-update-dialog',
    templateUrl: './task-create-update-dialog.component.html',
    styleUrls: ['./task-create-update-dialog.component.scss']
})
export class TaskCreateUpdateDialog extends CreateUpdateDialog<Task> implements OnInit {
    private taskAddForm: FormGroup;
    private subjects: SubjectDto[];
    private today: Date;

    constructor(private subjectService: SubjectService,
                public dialogRef: MdDialogRef<TaskCreateUpdateDialog>,
                private formBuilder: FormBuilder) {
        super();
    }

    public init(mode: DialogMode, param?: Task): void {
        super.init(mode, param);
        this.today = this.isEditMode() ? null : new Date();
    }

    ngOnInit() {
        this.subjectService.getCurrentSubjects()
            .subscribe((subjects: SubjectDto[]) => this.subjects = subjects);

        this.taskAddForm = this.formBuilder.group({
            name: [this.getParamOrDefault('name'), Validators.required],
            description: [this.getParamOrDefault('description'), Validators.required],
            dates: this.formBuilder.group({
                    todoDate: [this.getParamOrDefault('todoDate'), Validators.required],
                    dueDate: [this.getParamOrDefault('dueDate'), Validators.required],
                },
                {
                    validator: OutcobraValidators.dateFromIsBeforeDateTo('todoDate', 'dueDate', true)
                }),
            effort: [this.getParamOrDefault('effort'), Validators.required],
            subjectId: [this.getParamOrDefault('subject.id'), Validators.required]
        });
    }

    onSubmit() {
        if (this.taskAddForm.valid && this.taskAddForm.dirty) {
            this.dialogRef.close(this.formToTask(this.taskAddForm));
        }
        else if (this.taskAddForm.pristine) {
            Util.revalidateForm(this.taskAddForm);
        }
    }

    onCancel() {
        this.dialogRef.close();
    }

    private formToTask(formGroup: FormGroup): Task {
        let formValue = formGroup.value;
        return {
            name: formValue.name,
            description: formValue.description,
            todoDate: formValue.dates.todoDate,
            dueDate: formValue.dates.dueDate,
            effort: formValue.effort,
            progress: 0,
            subject: this.subjects.find(subject => subject.id == formValue.subjectId)
        } as Task
    }

}