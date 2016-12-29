import {Component, Input, OnInit, ViewEncapsulation, forwardRef, ElementRef, Output, EventEmitter} from "@angular/core";
import * as moment from "moment";
import {DateUtil} from "../../services/date-util.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, Validator} from "@angular/forms";
import {OutcobraValidators} from "../../services/outcobra-validators";
import {ColorService} from "../../services/color.service";
import {Color} from "../../model/Color";

const noop = () => {
};

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorpickerComponent),
    multi: true
};
export const DATEPICKER_MAX_MIN_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => ColorpickerComponent),
    multi: true
};

@Component({
    selector: 'colorpicker',
    templateUrl: 'colorpicker.component.html',
    styleUrls: ['colorpicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '(document: click)': 'onDocumentClick($event)'
    },
    providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR, DATEPICKER_MAX_MIN_VALIDATOR]
})
export class ColorpickerComponent implements OnInit, ControlValueAccessor, Validator {
    @Input() public opened: boolean = false;
    @Input() public currentColor: string;
    private colors: Color[];

    @Output() onSelectColor = new EventEmitter<Date>();

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    validateFn: Function;

    constructor(private elementRef: ElementRef,
                private colorService: ColorService) {
    }

    ngOnInit() {
        this.colorService.getColors()
            .subscribe((res: Color[]) => this.colors = res);
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
        this.close();
    }

    cancel() {
        this.close();
    }

    /**
     * target function of document click (see @Component Metadata)
     *
     * you are not fucking unused
     * @param event
     */
    onDocumentClick(event) {
        if (event.target.className.includes('colorpicker-toggler') || !this.elementRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    writeValue(value: any): void {
        if (value /*&& this.outDate !== value*/) {
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
