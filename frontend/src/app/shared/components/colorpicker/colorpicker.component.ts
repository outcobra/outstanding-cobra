import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ColorService} from '../../../core/services/color.service';
import {Color} from '../../../core/model/Color';
import {Util} from '../../../core/util/util';

const noop = () => {
};

export const COLORPICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorpickerComponent),
    multi: true
};

@Component({
    selector: 'colorpicker',
    templateUrl: './colorpicker.component.html',
    styleUrls: ['./colorpicker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '(document: click)': 'onDocumentClick($event)'
    },
    providers: [COLORPICKER_CONTROL_VALUE_ACCESSOR]
})
export class ColorpickerComponent implements OnInit, ControlValueAccessor {
    @Input() opened: boolean = false;
    @Input() initColor: string;
    private _colorRows: Color[][];
    private _colors: Color[];
    private _selectedColor: Color;

    private _outColor: Color = null;

    @Output('selectColor') _onSelectColor = new EventEmitter<Color>();

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    constructor(private _elementRef: ElementRef,
                private _colorService: ColorService) {
    }

    ngOnInit() {
        this._colorService.getColors()
            .subscribe((res: Color[]) => {
                this._selectedColor = res.find(color => this.initColor && color.hex.toLowerCase() == this.initColor.toLowerCase());
                this._colorRows = Util.split(res, 5);
                this._colors = res;
            });
    }

    public selectColor(color: Color) {
        this.writeValue(color);
    }

    public open() {
        this.opened = true;
    }

    public close() {
        if (this.isOpen()) {
            this._onTouchedCallback();
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
        if (!this._outColor) this.selectColor(this._getRandomColor());
        this.close();
    }

    public cancel() {
        this.close();
    }

    private _getRandomColor() {
        return this._colors[Math.floor(Math.random() * this._colors.length)];
    }

    /**
     * target function of document click (see @Component Metadata)
     *
     * you are not unused
     * @param event
     */
    onDocumentClick(event) {
        if (event.target.className.includes('colorpicker-toggler') || !this._elementRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    public writeValue(value: Color): void {
        if (value && this._selectedColor !== value) {
            this._selectedColor = value;
            this._onSelectColor.emit(value);
            this._outColor = value;
            this._onChangeCallback(value);
        }
    }

    public registerOnChange(fn: any): void {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouchedCallback = fn;
    }

    public getSelectedColorHex(): string {
        if (!this._selectedColor) return '#00000';
        return `#${this._selectedColor.hex}`;
    }

    get colorRows(): Color[][] {
        return this._colorRows;
    }

    get selectedColor(): Color {
        return this._selectedColor;
    }
}
