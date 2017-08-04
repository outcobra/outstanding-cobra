import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExamDto} from '../model/exam.dto';
import {ExamTaskService} from '../service/exam-task.service';
import {Subject} from 'rxjs/Subject';
import {ExamTaskDto} from '../model/exam.task.dto';
import {Util} from '../../core/util/util';

@Component({
    selector: 'exam-list-item',
    templateUrl: './exam-list-item.component.html',
    styleUrls: ['./exam-list-item.component.scss']
})
export class ExamListItemComponent implements OnInit {
    @Input() public exam: ExamDto;
    @Output('delete') onDelete: EventEmitter<ExamDto> = new EventEmitter<ExamDto>();
    @Output('edit') onEdit: EventEmitter<ExamDto> = new EventEmitter<ExamDto>();
    @Output('addMark') onAddMark: EventEmitter<ExamDto> = new EventEmitter<ExamDto>();

    public finishTask$: Subject<number> = new Subject();

    constructor(private _examTaskService: ExamTaskService) {
    }

    ngOnInit() {
        this.finishTask$
            .subscribe(id => {
                this._examTaskService.changeState(id)
                    .subscribe((examTask: ExamTaskDto) => {
                        this._updateExamTaskList(examTask)
                    })
            });
    }

    private _updateExamTaskList(examTask: ExamTaskDto) {
        Util.removeFirstMatch(this.exam.examTasks, (item: ExamTaskDto) => item.id == examTask.id)
        this.exam.examTasks.push(examTask)
    }
}
