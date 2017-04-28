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
import {ControlValueAccessor, NgControl, Validators} from '@angular/forms';
import {OCValidators} from '../../services/oc-validators';
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
    @Input() private _opened: boolean = false;
    @Input() private _currentDate: Date;
    @Input() private _initDate: Date;
    @Input() private _minDate: Date;
    @Input() private _maxDate: Date;
    @Input() private _pickerMode: string;
    @Input() private _placeholder: string;
    @Input() private _value: Date;

    // emitted Date
    private _outDate: Date;
    // date for inputField
    private _formattedDate: string;

    @Output('selectDate') private _onSelectDate = new EventEmitter<Date>();

    private _onTouchedCallback: () => void = () => {
    };
    private _onChangeCallback: (_: any) => void = () => {
    };

    constructor(private elementRef: ElementRef, @Self() @Optional() public control: NgControl) {
        if (this.control) {
            this.control.valueAccessor = this;
        }
    }

    ngAfterContentInit() {
        if (!this.control) return;
        this.control.control.setValidators(
            Validators.compose([OCValidators.isBetweenDay(this._minDate, this._maxDate), this.control.control.validator])
        );
        /*
         This is some weird shit but without the Promise it does not work and an error is thrown
         */
        if (this.control.value) {
            Promise.resolve(null).then(() => {
                this._selectDate(this.control.value);
                Util.revalidateControl(this.control.control);
            });
        }
    }

    ngOnInit() {
        this._minDate = (this._minDate || DateUtil.MIN_DATE);
        this._maxDate = (this._maxDate || DateUtil.MAX_DATE);
        if (this._minDate > this._maxDate) {
            throw new DatePickerMaxDateSmallerThanMinDateError();
        }
        this._currentDate = this._initDate = this._checkInitDate();
    }

    public open() {
        this._opened = true;
    }

    public close() {
        if (this.isOpen()) {
            this._onTouchedCallback();
            this._opened = false;
        }
    }

    public toggle() {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    }

    public isOpen() {
        return this._opened;
    }

    public submit() {
        if (this._currentDate === this._initDate) this._selectDate(this._initDate);
        this.close();
    }

    public cancel() {
        this._selectDate(this._initDate);
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

    public inputDateChanged() { // todo make a better parser for the input field (low priority)
        let date = moment(this._formattedDate, 'DD.MM.YYYY').valueOf();
        if (!isNaN(date)) {
            this._selectDate(new Date(date));
        }
    }

    private _formatDate(date: Date) {
        return moment(date).format('DD.MM.YYYY');
    }

    private _checkInitDate(): Date {
        let date: Date;
        if (this._initDate instanceof Date) {
            date = this._initDate;
            this._formattedDate = this._formatDate(date);
        } else {
            date = new Date();
        }
        if (DateUtil.isBetweenDay(date, this._minDate, this._maxDate)) {
            return date;
        }
        return (date < this._minDate) ?
            (DateUtil.isMinDate(this._minDate) ? new Date() : this._minDate) :
            (DateUtil.isMaxDate(this._maxDate) ? new Date() : this._maxDate);
    }

    private _selectDate(date: Date) {
        this._currentDate = date;
        this.writeValue(date);
        this._onSelectDate.emit(date);
        this._formattedDate = this._formatDate(date);
    }

    selectYear(date: Date) {
        // TODO
    }

    public writeValue(value: any): void {
        if (value && this._outDate !== value) {
            this._outDate = value;
            this._onChangeCallback(value);
        }
    }

    public registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    get opened(): boolean {
        return this._opened;
    }

    get currentDate(): Date {
        return this._currentDate;
    }

    get minDate(): Date {
        return this._minDate;
    }

    get maxDate(): Date {
        return this._maxDate;
    }

    get pickerMode(): string {
        return this._pickerMode;
    }

    get placeholder(): string {
        return this._placeholder;
    }

    get value(): Date {
        return this._value;
    }

    get formattedDate(): string {
        return this._formattedDate;
    }
}
