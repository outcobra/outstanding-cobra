import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExamDto} from '../model/exam.dto';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateUtil} from '../../core/services/date-util.service';
import {ExamTaskDto} from '../model/exam.task.dto';
import {isUndefined} from 'util';
import {ExamTaskService} from '../service/exam-task.service';

@Component({
    selector: 'exam-list-item',
    templateUrl: './exam-list-item.component.html',
    styleUrls: ['./exam-list-item.component.scss']
})
export class ExamListItemComponent implements OnInit {

    @Input() public exam: ExamDto
    @Output('deleteExam') onExamDeletion: EventEmitter<ExamDto> = new EventEmitter<ExamDto>();
    @Output('editExam') onExamEdition: EventEmitter<ExamDto> = new EventEmitter<ExamDto>();

    private _examFormGroup: FormGroup

    constructor(private _examTaskService: ExamTaskService,
                private _formBuilder: FormBuilder) {
    }

    private _formArrayForExamTasks(): AbstractControl[] {
        let tasks = this.exam.examTasks as ExamTaskDto[]
        let controls = tasks.map((examTask: ExamTaskDto) =>
            this._formBuilder.group({
                id: !isUndefined(examTask.id) ? examTask.id : 0,
                finished: [examTask.finished],
                task: [examTask.task, Validators.required],
                examId: [examTask.examId]
            })
        )
        return controls;
    }

    ngOnInit() {
        this._examFormGroup = this._formBuilder.group({
            examName: [this.exam.name, (name: string) => name.length != 0],
            examDescription: [this.exam.description],
            tasks: this._formBuilder.array(this._formArrayForExamTasks()),
            examDate: [DateUtil.transformToDateIfPossible(this.exam.date)]
        });

    }

    public changeExamTaskState(id: number) {
        console.error("test")
        this._examTaskService.changeState(id).subscribe((task: ExamTaskDto) => console.warn(task))
    }

    public editExam(event: Event) {
        event.stopPropagation();
        this.onExamEdition.emit(this.exam)

    }

    public deleteExam(event: Event) {
        event.stopPropagation()
        this.onExamDeletion.emit(this.exam)
    }

    get examFormGroup(): FormGroup {
        return this._examFormGroup;
    }

    get examTaskArray(): FormArray {
        return this.examFormGroup.get('tasks') as FormArray;
    };

    set examFormGroup(value: FormGroup) {
        this._examFormGroup = value;
    }
}
