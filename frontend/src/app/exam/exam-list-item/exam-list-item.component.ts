import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExamDto} from '../model/exam.dto';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DateUtil} from '../../core/services/date-util.service';

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

    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this._examFormGroup = this._formBuilder.group({
            examName: [this.exam.name, (name: string) => name.length != 0],
            examDescription: [this.exam.description],
            taskControl: [],
            examDate: [DateUtil.transformToDateIfPossible(this.exam.date)]
        });

    }

    public editExam(event: Event) {
        event.stopPropagation()
        this.onExamEdition.emit(this.exam)
    }

    public deleteExam(event: Event) {
        event.stopPropagation()
        this.onExamDeletion.emit(this.exam)
    }

    get examFormGroup(): FormGroup {
        return this._examFormGroup;
    }

    set examFormGroup(value: FormGroup) {
        this._examFormGroup = value;
    }
}
