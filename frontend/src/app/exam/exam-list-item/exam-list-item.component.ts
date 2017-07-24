import {Component, Input, OnInit} from '@angular/core';
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

    private _editMode: boolean = true;
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

    public saveExam() {
        console.warn(this.exam)
        this.editMode = false
    }

    get editMode(): boolean {
        return this._editMode;
    }

    get examFormGroup(): FormGroup {
        return this._examFormGroup;
    }

    set editMode(value: boolean) {
        this._editMode = value;
    }

    set examFormGroup(value: FormGroup) {
        this._examFormGroup = value;
    }
}
