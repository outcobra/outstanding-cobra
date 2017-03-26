import {
    AfterContentInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    ViewEncapsulation
} from '@angular/core';
import * as moment from 'moment';
import {DateUtil} from '../../services/date-util.service';
import {DatePickerMaxDateSmallerThanMinDateError} from './datepicker-errors';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {OutcobraValidators} from '../../services/outcobra-validators';
import {Util} from '../../util/util';

@Component({
    selector: 'datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '(document: click)': 'onDocumentClick($event)'
    }
})
export class DatepickerComponent implements OnInit, AfterContentInit, ControlValueAccessor {
    @Input() public opened: boolean = false;
    @Input() public currentDate: Date;
    @Input() public initDate: Date;
    @Input() public minDate: Date;
    @Input() public maxDate: Date;
    @Input() public pickerMode: string;
    @Input() public placeholder: string;
    @Input() public value: Date;

    // emitted Date
    private outDate: Date;
    // date for inputField
    public formattedDate: string;

    @Output('selectDate') onSelectDate = new EventEmitter<Date>();

    private onTouchedCallback: () => void = () => {
    };
    private onChangeCallback: (_: any) => void = () => {
    };

    constructor(private elementRef: ElementRef, @Self() @Optional() public control: NgControl) {
        if (this.control) {
            this.control.valueAccessor = this;
        }
    }

    ngAfterContentInit() {
        if (!this.control) return;
        this.control.control.setValidators(OutcobraValidators.isBetweenDay(this.minDate, this.maxDate));
        /*
         This is some weird shit but without the Promise it does not work and an error is thrown
         */
        if (this.control.value) {
            Promise.resolve(null).then(() => {
                this.selectDate(this.control.value);
                Util.revalidateControl(this.control.control);
            });
        }
    }

    ngOnInit() {
        this.minDate = (this.minDate || DateUtil.MIN_DATE);
        this.maxDate = (this.maxDate || DateUtil.MAX_DATE);
        if (this.minDate > this.maxDate) {
            throw new DatePickerMaxDateSmallerThanMinDateError();
        }
        this.currentDate = this.initDate = this.checkInitDate();
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
        if (!this.elementRef.nativeElement.contains(event.target)) {
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

}
