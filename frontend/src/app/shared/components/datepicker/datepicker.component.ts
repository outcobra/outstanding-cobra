import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import * as moment from 'moment';

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent implements OnInit {
    @Input() public opened: boolean = true;
    @Input() public currentDate: Date;
    @Input() public initDate: Date;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public pickerMode: string;


    constructor() {
    }

    ngOnInit() {
        this.currentDate = (this.initDate instanceof Date) ? this.initDate :  new Date();
    }

    open() {
        this.opened = !this.opened;
    }

    selectDate(date: Date) {
        this.currentDate = date;
    }

    selectYear(date: Date) {

    }

}
