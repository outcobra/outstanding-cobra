import {Component, OnInit} from '@angular/core';
import {ExamService} from './service/exam.service';
import {ExamDto} from './model/exam.dto';
import {ActivatedRoute} from '@angular/router';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';

@Component({
    selector: 'exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {

    private _activeExams: ExamDto[] = [];
    private _allExams: ExamDto[]
    private _filteredExams: ExamDto[]
    private _exam: ExamDto
    private _searchFilter: string


    constructor(private _examService: ExamService,
                private _route: ActivatedRoute,
                private _notificationService: NotificationWrapperService) {
    }

    ngOnInit() {
        this._loadActiveExams()
    }

    private _loadActiveExams() {
        this._examService.readAll().subscribe((examList: ExamDto[]) => {
            examList.forEach((it: ExamDto) => console.log(it))
            this._activeExams = examList;
        })
    }
}
