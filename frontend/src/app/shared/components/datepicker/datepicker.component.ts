import {Component, Input, OnInit, ViewEncapsulation, forwardRef, ElementRef, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import {DateUtil} from "../../services/date-util.service";
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
    host: {
        '(document: click)': 'onDocumentClick($event)'
    },
    providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
    @Input() public opened: boolean = true;
    @Input() public currentDate: Date;
    @Input() public initDate: Date;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public pickerMode: string;

    // emitted Date
    private outDate: Date;
    // date for inputField
    private formattedDate: string;

    @Output() onSelectDate = new EventEmitter<Date>();

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;


    constructor(private dateUtil: DateUtil, private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.minDate = (this.minDate || this.dateUtil.MIN_DATE);
        this.maxDate = (this.maxDate || this.dateUtil.MAX_DATE);
        if (this.minDate > this.maxDate) {
            throw new DatePickerMaxDateSmallerThanMinDateError();
        }
        this.currentDate = this.initDate = this.checkInitDate();
    }

    open() {
        this.opened = true;
    }

    close() {
        this.onTouchedCallback();
        this.opened = false;
    }

    toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    isOpen() {
        return this.opened;
    }

    submit() {
        this.close();
    }

    cancel() {
        this.selectDate(this.initDate);
        this.close();
    }

    // target function of document click (see @Component Metadata)
    onDocumentClick(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    inputDateChanged(value: any) {
        console.log(value);
    }

    formatDate(date: Date) {
        return moment(date).format('DD.MM.YYYY');
    }

    checkInitDate(): Date {
        let date:Date;
        if (this.initDate instanceof Date) {
            date = this.initDate;
            this.formattedDate = this.formatDate(date);
        } else {
            date = new Date();
        }
        if (this.dateUtil.isBetweenDay(date, this.minDate, this.maxDate)) {
            return date;
        }
        return (date < this.minDate) ?
            (this.dateUtil.isMinDate(this.minDate) ? new Date() : this.minDate) :
            (this.dateUtil.isMaxDate(this.maxDate) ? new Date() : this.maxDate);
    }

    selectDate(date: Date) {
        console.log(date);
        this.currentDate = date;
        console.log(date);
        this.writeValue(date);
        this.onSelectDate.emit(date);
        this.formattedDate = this.formatDate(date);
    }

    selectYear(date: Date) {

    }

    writeValue(value: any): void {
        if (value && this.outDate !== value) {
            console.log(this);
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
