import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
    selector: '[markHighlighter]'
})
export class MarkHighlighterDirective {
    @Input('markHighlighter') mark: number;

    @HostBinding('class.insufficient')
    public get insufficient() {
        return this.mark < 4.0;
    }
}
