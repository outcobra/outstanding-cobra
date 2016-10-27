import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import * as moment from 'moment';
import {DateUtil} from "../../services/DateUtil";
import {DatePickerMaxDateSmallerThanMinDateError} from "./datepicker-errors";

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


    constructor(private dateUtil: DateUtil) {
    }

    ngOnInit() {
        this.minDate = (this.minDate || this.dateUtil.MIN_DATE);
        this.maxDate = (this.maxDate || this.dateUtil.MAX_DATE);
        if (this.minDate > this.maxDate) {
            throw new DatePickerMaxDateSmallerThanMinDateError();
        }
        this.currentDate = this.initDate = this.checkInitDate();
        console.log(this.minDate);
        console.log(this.maxDate);

    }

    open() {
        this.opened = !this.opened;
    }

    checkInitDate(): Date {
        let date = (this.initDate instanceof Date) ? this.initDate : new Date();
        if (this.dateUtil.isBetweenDay(date, this.minDate, this.maxDate)) {
            return date;
        }
        return (date < this.minDate) ?
            (this.dateUtil.isMinDate(this.minDate) ? new Date() : this.minDate) :
            (this.dateUtil.isMaxDate(this.maxDate) ? new Date() : this.maxDate);
    }

    selectDate(date: Date) {
        this.currentDate = date;
    }

    selectYear(date: Date) {

    }

}
