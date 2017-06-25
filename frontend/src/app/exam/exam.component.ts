import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'exam',
    templateUrl: './exam.component.html',
    styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
        console.warn('exam loaded');
    }

}
