import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ColorService} from '../../services/color.service';
import {Color} from '../../model/Color';
import {Util} from '../../util/util';

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
    @Input() public opened: boolean = false;
    @Input() public initColor: string;
    public colorRows: Color[][];
    private colors: Color[];
    private selectedColor: Color;

    private outColor: Color = null;

    @Output('selectColor') onSelectColor = new EventEmitter<Color>();

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    constructor(private elementRef: ElementRef,
                private colorService: ColorService) {
    }

    ngOnInit() {
        this.colorService.getColors()
            .subscribe((res: Color[]) => {
                this.selectedColor = res.find(color => this.initColor && color.hex.toLowerCase() == this.initColor.toLowerCase());
                this.colorRows = Util.split(res, 5);
                this.colors = res;
            });
    }

    selectColor(color: Color) {
        this.writeValue(color);
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
        if (!this.outColor) this.selectColor(this.getRandomColor());
        this.close();
    }

    cancel() {
        this.selectColor(this.getRandomColor());
        this.close();
    }

    private getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    /**
     * target function of document click (see @Component Metadata)
     *
     * you are not unused
     * @param event
     */
    onDocumentClick(event) {
        if (event.target.className.includes('colorpicker-toggler') || !this.elementRef.nativeElement.contains(event.target)) {
            this.close();
        }
    }

    writeValue(value: Color): void {
        if (value && this.selectedColor !== value) {
            this.selectedColor = value;
            this.onSelectColor.emit(value);
            this.outColor = value;
            this.onChangeCallback(value);
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    getSelectedColorHex(): string {
        if (!this.selectedColor) return '#00000';
        return `#${this.selectedColor.hex}`;
    }
}
