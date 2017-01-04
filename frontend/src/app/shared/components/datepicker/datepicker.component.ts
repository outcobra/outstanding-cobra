import {Component, Input, OnInit, ViewEncapsulation, forwardRef, ElementRef, Output, EventEmitter} from "@angular/core";
import * as moment from "moment";
import {DateUtil} from "../../services/date-util.service";
import {DatePickerMaxDateSmallerThanMinDateError} from "./datepicker-errors";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, Validator} from "@angular/forms";
import {OutcobraValidators} from "../../services/outcobra-validators";

const noop = () => {
};

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
};
export const DATEPICKER_MAX_MIN_VALIDATOR: any = {
    provide: NG_VALIDATORS,
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
    providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR, DATEPICKER_MAX_MIN_VALIDATOR]
})
export class DatepickerComponent implements OnInit, ControlValueAccessor, Validator {
    @Input() public opened: boolean = false;
    @Input() public currentDate: Date;
    @Input() public initDate: Date;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public pickerMode: string;
    @Input() public placeholder: string;

    // emitted Date
    private outDate: Date;
    // date for inputField
    private formattedDate: string;

    @Output() onSelectDate = new EventEmitter<Date>();

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    validateFn: Function;


    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.minDate = (this.minDate || DateUtil.MIN_DATE);
        this.maxDate = (this.maxDate || DateUtil.MAX_DATE);
        if (this.minDate > this.maxDate) {
            throw new DatePickerMaxDateSmallerThanMinDateError();
        }
        this.currentDate = this.initDate = this.checkInitDate();
        this.validateFn = OutcobraValidators.isBetweenDay(this.minDate, this.maxDate);
    }

    open() {
        this.opened = true;
    }

    close() {
        if (this.isOpen()) {
            this.onTouchedCallback();
            this.opened = false;
        }
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
        if (this.currentDate === this.initDate) this.selectDate(this.initDate);
        this.close();
    }

    cancel() {
        this.selectDate(this.initDate);
        this.close();
    }

    /**
     * target function of document click (see @Component Metadata)
     *
     * you are not fucking unused
     * @param event
     */
    onDocumentClick(event) {
        if (event.target.className.includes('datepicker-toggler') || !this.elementRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    inputDateChanged() { // todo make a better parser for the input field (low priority)
        let date = moment(this.formattedDate, 'DD.MM.YYYY').valueOf();
        if (!isNaN(date)) {
            this.selectDate(new Date(date));
        }
    }

    formatDate(date: Date) {
        return moment(date).format('DD.MM.YYYY');
    }

    checkInitDate(): Date {
        let date: Date;
        if (this.initDate instanceof Date) {
            date = this.initDate;
            this.formattedDate = this.formatDate(date);
        } else {
            date = new Date();
        }
        if (DateUtil.isBetweenDay(date, this.minDate, this.maxDate)) {
            return date;
        }
        return (date < this.minDate) ?
            (DateUtil.isMinDate(this.minDate) ? new Date() : this.minDate) :
            (DateUtil.isMaxDate(this.maxDate) ? new Date() : this.maxDate);
    }

    selectDate(date: Date) {
        this.currentDate = date;
        this.writeValue(date);
        this.onSelectDate.emit(date);
        this.formattedDate = this.formatDate(date);
    }

    selectYear(date: Date) {
        // TODO
    }

    writeValue(value: any): void {
        if (value && this.outDate !== value) {
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

    validate(control: AbstractControl) {
        return this.validateFn(control);
    }

}
