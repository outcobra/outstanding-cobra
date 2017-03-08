import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {SubjectService} from "../../manage/service/subject.service";
import {SubjectDto} from "../../manage/model/ManageDto";
import {Util} from "../../shared/util/util";
import {OutcobraValidators} from "../../shared/services/outcobra-validators";
import {Task} from "../model/Task";
import {CreateUpdateDialog} from "../../common/CreateUpdateDialog";

@Component({
    selector: './task-create-update-dialog',
    templateUrl: './task-create-update-dialog.component.html',
    styleUrls: ['./task-create-update-dialog.component.scss']
})
export class TaskCreateUpdateDialog extends CreateUpdateDialog<Task> implements OnInit {
    private taskCreateUpdateForm: FormGroup;
    private subjects: SubjectDto[];
    private today: Date = new Date();

    constructor(private subjectService: SubjectService,
                public dialogRef: MdDialogRef<TaskCreateUpdateDialog>,
                private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.subjectService.getCurrentSubjects()
            .subscribe((subjects: SubjectDto[]) => this.subjects = subjects);

        this.taskCreateUpdateForm = this.formBuilder.group({
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
        if (this.taskCreateUpdateForm.valid && this.taskCreateUpdateForm.dirty) {
            this.dialogRef.close(this.formToTask(this.taskCreateUpdateForm));
        }
        else if (this.taskCreateUpdateForm.pristine) {
            Util.revalidateForm(this.taskCreateUpdateForm);
        }
    }

    onCancel() {
        this.dialogRef.close();
    }

    private formToTask(formGroup: FormGroup): Task {
        let formValue = formGroup.value;
        return {
            id: this.isEditMode() && this.param.id ? this.param.id : null,
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
