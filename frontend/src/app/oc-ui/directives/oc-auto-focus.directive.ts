import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {isTrue, isTruthy} from '../../core/util/helper';

@Directive({
    selector: '[ocAutoFocus]'
})
export class OCAutoFocusDirective implements OnInit, AfterViewInit {
    @Input() public ocAutoFocus;
    @Input() public ocAutoSelect;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
        this.ocAutoFocus = this.ocAutoFocus || true;
        this.ocAutoSelect = this.ocAutoSelect || false;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (isTrue(this.ocAutoFocus) && isTruthy(this.el.nativeElement.focus)) {
                this.el.nativeElement.focus();
            }
            if (isTrue(this.ocAutoSelect) && isTruthy(this.el.nativeElement.select)) {
                this.el.nativeElement.select();
            }
        });
    }
}
