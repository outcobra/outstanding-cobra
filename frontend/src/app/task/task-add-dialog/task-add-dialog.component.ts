import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {SubjectService} from "../../manage/service/subject.service";
import {SubjectDto} from "../../manage/model/ManageDto";
import {Util} from "../../shared/services/util";
import {OutcobraValidators} from "../../shared/services/outcobra-validators";
import {Task} from "../model/Task";

@Component({
    selector: 'task-add-dialog',
    templateUrl: './task-add-dialog.component.html',
    styleUrls: ['./task-add-dialog.component.scss']
})
export class TaskAddDialogComponent implements OnInit {
    private taskAddForm: FormGroup;
    private subjects: SubjectDto[];
    private today: Date = new Date();

    constructor(private subjectService: SubjectService,
                public dialogRef: MdDialogRef<TaskAddDialogComponent>,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.subjectService.getCurrentSubjects()
            .subscribe((subjects: SubjectDto[]) => this.subjects = subjects);

        this.taskAddForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            dates: this.formBuilder.group({
                    todoDate: ['', Validators.required],
                    dueDate: ['', Validators.required],
                },
                {
                    validator: OutcobraValidators.dateFromIsBeforeDateTo('todoDate', 'dueDate', true)
                }),
            effort: ['', Validators.required],
            subjectId: ['', Validators.required]
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
