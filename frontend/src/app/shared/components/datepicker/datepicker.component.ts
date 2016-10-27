import {Component, OnInit, ViewEncapsulation, forwardRef} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import * as moment from 'moment';
import {DateUtil} from "../../services/DateUtil";
import {DatePickerMaxDateSmallerThanMinDateError} from "./datepicker-errors";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const noop = () => {};

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
    @Input() public opened: boolean = true;
    @Input() public currentDate: Date;
    @Input() public initDate: Date;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public pickerMode: string;

    private outDate: Date;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;


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
        this.writeValue(date);
    }

    selectYear(date: Date) {

    }

    writeValue(value: any): void {
        if (this.outDate !== value) {
            this.outDate = value;
            this.onChangeCallback(value);
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

}
