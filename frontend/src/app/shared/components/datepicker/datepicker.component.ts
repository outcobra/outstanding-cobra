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
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import * as moment from 'moment';
import {DateUtil} from '../../../core/services/date-util.service';
import {DatePickerMaxDateSmallerThanMinDateError} from './datepicker-errors';
import {ControlValueAccessor, NgControl, Validators} from '@angular/forms';
import {OCValidators} from '../../../core/services/oc-validators';
import {MdInputDirective} from '@angular/material';
import {FormUtil} from '../../../core/util/form-util';

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
    @Input() opened: boolean = false;
    @Input() initDate: Date;
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() pickerMode: string;
    @Input() placeholder: string;

    private _currentDate: Date;

    @ViewChild(MdInputDirective) inputField: MdInputDirective;

    // emitted Date
    private _outDate: Date;
    // date for inputField
    private _formattedDate: string;

    @Output('selectDate') onSelectDate = new EventEmitter<Date>();

    private _onTouchedCallback: () => void = () => {
    };
    private _onChangeCallback: (_: any) => void = () => {
    };

    constructor(private _elementRef: ElementRef, @Self() @Optional() public control: NgControl) {
        if (this.control) {
            this.control.valueAccessor = this;
        }
    }

    ngAfterContentInit() {
        if (!this.control) return;
        this.control.control.setValidators(
            Validators.compose([OCValidators.isBetweenDaysInclusive(this.minDate, this.maxDate), this.control.control.validator])
        );
        /*
         This is some weird shit but without the Promise it does not work and an error is thrown
         */
        if (this.control.value) {
            Promise.resolve(null).then(() => {
                this.selectDate(this.control.value);
                FormUtil.revalidateControl(this.control.control);
            });
        }
    }

    ngOnInit() {
        this.minDate = (this.minDate || DateUtil.MIN_DATE);
        this.maxDate = (this.maxDate || DateUtil.MAX_DATE);
        if (this.minDate > this.maxDate) {
            throw new DatePickerMaxDateSmallerThanMinDateError();
        }
        this._currentDate = this.initDate = this._checkInitDate();
    }

    public open() {
        this.opened = true;
    }

    public close() {
        if (this.isOpen()) {
            this._onTouchedCallback();
            this.syncValidityWithMdInput();
            this.opened = false;
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
        return this.opened;
    }

    public submit() {
        if (this._currentDate === this.initDate) this.selectDate(this.initDate);
        this.close();
    }

    public cancel() {
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
        if (!this._elementRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    public inputDateChanged() { // todo make a better parser for the input field (low priority)
        let date = moment(this._formattedDate, 'DD.MM.YYYY').valueOf();
        if (!isNaN(date)) {
            this.selectDate(new Date(date));
        }
    }

    private _formatDate(date: Date) {
        return moment(date).format('DD.MM.YYYY');
    }

    private _checkInitDate(): Date {
        let date: Date;
        if (this.initDate instanceof Date) {
            date = this.initDate;
            this._formattedDate = this._formatDate(date);
        } else {
            date = new Date();
        }
        if (DateUtil.isBetweenDaysInclusive(date, this.minDate, this.maxDate)) {
            return date;
        }
        return (date < this.minDate) ?
            (DateUtil.isMinDate(this.minDate) ? new Date() : this.minDate) :
            (DateUtil.isMaxDate(this.maxDate) ? new Date() : this.maxDate);
    }

    public selectDate(date: Date) {
        this._currentDate = date;
        this.writeValue(date);
        this.onSelectDate.emit(date);
        this._formattedDate = this._formatDate(date);
        this.syncValidityWithMdInput();
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

    private syncValidityWithMdInput() {
        this.control.control.updateValueAndValidity();
        if (this.inputField && this.control.control.errors != null) {
            this.inputField._ngControl.control.setErrors(this.control.control.errors);
            if (this.control.dirty) {
                this.inputField._ngControl.control.markAsDirty();
            } else {
                this.inputField._ngControl.control.markAsPristine();
            }
            if (this.control.touched) {
                this.inputField._ngControl.control.markAsTouched();
            }
            else {
                this.inputField._ngControl.control.markAsUntouched();
            }
        }
    }

    get currentDate(): Date {
        return this._currentDate;
    }

    get formattedDate(): string {
        return this._formattedDate;
    }


    set formattedDate(value: string) {
        this._formattedDate = value;
    }
}
