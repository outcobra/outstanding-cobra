import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExamDto} from '../model/exam.dto';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateUtil} from '../../core/services/date-util.service';
import {ExamTaskDto} from '../model/exam.task.dto';
import {isUndefined} from 'util';
import {ExamTaskService} from '../service/exam-task.service';
import {Subject} from 'rxjs/Subject';
import {isTruthy} from '../../core/util/helper';

@Component({
    selector: 'exam-list-item',
    templateUrl: './exam-list-item.component.html',
    styleUrls: ['./exam-list-item.component.scss']
})
export class ExamListItemComponent implements OnInit {
    @Input() public exam: ExamDto;
    @Output('delete') onExamDeletion: EventEmitter<ExamDto> = new EventEmitter<ExamDto>();
    @Output('edit') onExamEdition: EventEmitter<ExamDto> = new EventEmitter<ExamDto>();

    public finishTask$: Subject<number> = new Subject();

    constructor(private _examTaskService: ExamTaskService) {
    }

    ngOnInit() {
        this.finishTask$
            .filter(isTruthy)
            .subscribe(id => this._examTaskService.changeState(id));
    }
}
