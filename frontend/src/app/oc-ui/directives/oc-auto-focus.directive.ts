import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {isTrue, isTruthy} from '../../core/util/helper';

@Directive({
    selector: '[ocAutoFocus]'
})
export class OCAutoFocusDirective implements AfterViewInit {
    @Input() public ocAutoFocus = true;
    @Input() public ocAutoSelect = false;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit() {
        if (isTrue(this.ocAutoFocus) && isTruthy(this.el.nativeElement.focus)) {
            this.el.nativeElement.focus();
        }
        if (isTrue(this.ocAutoSelect) && isTruthy(this.el.nativeElement.select)) {
            this.el.nativeElement.select();
        }
    }
}
