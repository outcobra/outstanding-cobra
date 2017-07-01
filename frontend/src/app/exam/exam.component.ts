import {Component, OnInit} from '@angular/core';
import {ExamService} from './service/exam.service';
import {ExamDto} from './model/exam.dto';
import {ActivatedRoute} from '@angular/router';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';
import {ExamTaskDto} from './model/exam.task.dto';

@Component({
    selector: 'exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {

    private _activeExams: ExamDto[] = [];
    private _allExams: ExamDto[] = []
    private _displayedExams: ExamDto[] = []
    private _exam: ExamDto
    private _searchFilter: string = ""


    constructor(private _examService: ExamService,
                private _route: ActivatedRoute,
                private _notificationService: NotificationWrapperService) {
    }

    ngOnInit() {
        this._loadActiveExams()
        this._loadAllExams()
        this._displayForFilter()
    }

    private _loadActiveExams() {
        this._examService.readAllActive().subscribe((activeExams: ExamDto[]) => {
            this._activeExams = activeExams;
        })
    }

    private _loadAllExams() {
        this._examService.readAll().subscribe((allExams: ExamDto[]) => {
            this._allExams = allExams
        })
    }

    private _addExam() {

    }

    private _removeExam() {

    }

    private _displayForFilter(all: boolean = true) {
        this._displayedExams = all ? this._allExams : this._activeExams
        this._displayedExams.filter((exam: ExamDto) => {
            let examString = `${exam.name} ${exam.description} ${exam.subjectName}`
            exam.examTasks.forEach((et: ExamTaskDto) => examString += et.task)
            examString.toLowerCase()
            console.warn(examString)
            this._searchFilter.toLowerCase().split(' ')
                .every((searchTerm: string) => examString.includes(searchTerm))
        })

    }
}
