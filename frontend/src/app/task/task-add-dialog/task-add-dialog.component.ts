import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MdDialogRef} from "@angular/material";
import {SubjectService} from "../../manage/service/subject.service";
import {SubjectDto} from "../../manage/model/ManageDto";

@Component({
    selector: 'task-add-dialog',
    templateUrl: './task-add-dialog.component.html',
    styleUrls: ['./task-add-dialog.component.scss']
})
export class TaskAddDialogComponent implements OnInit {
    private taskAddForm: FormGroup;
    private subjects: SubjectDto[];

    constructor(private subjectService: SubjectService,
                public dialogRef: MdDialogRef<TaskAddDialogComponent>,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.subjectService.getCurrentSubjects()
            .subscribe((subjects: SubjectDto[]) => this.subjects = subjects);

        this.taskAddForm = this.formBuilder.group({});
    }

}
