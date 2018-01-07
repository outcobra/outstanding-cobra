import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
    selector: '[MarkHighlighter]'
})
export class MarkHighlighterDirective {
    @Input('MarkHighlighter') mark: number;

    @HostBinding('class.insufficient')
    public get insufficient() {
        return this.mark < 4.0;
    }
}
