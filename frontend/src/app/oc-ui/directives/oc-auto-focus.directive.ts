import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {isTrue, isTruthy} from '../../core/util/helper';

@Directive({
    selector: '[ocAutoFocus]'
})
export class OCAutoFocusDirective implements OnInit, AfterViewInit {
    @Input() public ocAutoFocus = true;
    @Input() public ocAutoSelect = false;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
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
