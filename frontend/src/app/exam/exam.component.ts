import {Component, OnInit} from '@angular/core';
import {ExamService} from './service/exam.service';
import {ExamDto} from './model/exam.dto';
import {ActivatedRoute} from '@angular/router';
import {NotificationWrapperService} from '../core/notifications/notification-wrapper.service';
import {ExamTaskDto} from './model/exam.task.dto';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
    private _activeExams: ExamDto[] = [];

    private _allExams: ExamDto[] = []
    public displayedExams: ExamDto[] = []
    private _exam: ExamDto
    private _searchFilter: string = ""
    private _searchForm: FormGroup
    constructor(private _examService: ExamService,
                private _route: ActivatedRoute,
                private _notificationService: NotificationWrapperService) {
    }


    ngOnInit() {
        this._searchForm = new FormGroup({
            searchTerm: new FormControl()
        })
        this._loadActiveExams()
        this._loadAllExams()
        //this._displayForFilter()
    }

    private _loadActiveExams() {
        this._examService.readAllActive().subscribe((activeExams: ExamDto[]) => {
            this._activeExams = activeExams;
        })
    }

    private _loadAllExams() {
        this._examService.readAll().subscribe((allExams: ExamDto[]) => {
            this._allExams = allExams
            this.displayedExams = allExams
        })
    }

    public addExam() {

    }

    public removeExam() {

    }

    public editExam(exam: ExamDto) {

    }

    private _displayForFilter(all: boolean = true) {
        this.displayedExams = all ? this._allExams : this._activeExams
        this.displayedExams.filter((exam: ExamDto) => {
            let examString = `${exam.name} ${exam.description} ${exam.subjectName}`
            exam.examTasks.forEach((et: ExamTaskDto) => examString += et.task)
            examString.toLowerCase()
            console.warn(examString)
            this._searchFilter.toLowerCase().split(' ')
                .every((searchTerm: string) => examString.includes(searchTerm))
        })
        this.displayedExams = this._allExams
        console.error(this.displayedExams)
    }

    get searchForm(): FormGroup {
        return this._searchForm;
    }
}
