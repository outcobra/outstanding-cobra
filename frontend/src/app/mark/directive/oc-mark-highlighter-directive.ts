import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
    selector: '[ocMarkHighlighter]'
})
export class OcMarkHighlighterDirective implements OnInit {
    @Input('ocMarkHighlighter') mark: number;

    constructor(private _elementRef: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnInit() {
        if (this.mark < 4.0) {
            this._renderer.addClass(this._elementRef.nativeElement, 'insufficient');
        }
    }
}
