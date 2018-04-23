import {Component, EventEmitter, HostListener, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {ESCAPE} from '@angular/cdk/keycodes';

@Component({
    selector: 'oc-popup',
    templateUrl: './oc-popup.html',
    styleUrls: ['./oc-popup.scss'],
    exportAs: 'ocPopup'
})
export class OCPopup implements OnDestroy {
    @Input() hasBackdrop: boolean = true;
    @Input() backdropClass: string;

    @ViewChild(TemplateRef) content: TemplateRef<any>;

    @Output() close: EventEmitter<void> = new EventEmitter();

    ngOnDestroy(): void {
        this.close.complete();
    }

    @HostListener('keydown')
    private _handleKeyDown(event: KeyboardEvent) {
        if (event.keyCode === ESCAPE) {
            this.close.emit()
        }
    }
}
