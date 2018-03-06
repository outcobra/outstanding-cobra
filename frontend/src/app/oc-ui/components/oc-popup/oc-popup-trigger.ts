import {Directive, ElementRef, HostListener, Input, OnInit, ViewContainerRef} from '@angular/core';
import {OCPopup} from './oc-popup';
import {
    ConnectedPositionStrategy,
    HorizontalConnectionPos,
    Overlay,
    OverlayConfig,
    OverlayRef,
    VerticalConnectionPos
} from '@angular/cdk/overlay';
import {isFalsy} from '../../../core/util/helper';
import {TemplatePortal} from '@angular/cdk/portal';

@Directive({
    selector: '[ocPopupTrigger]'
})
export class OCPopupTrigger implements OnInit {
    private _overlayRef: OverlayRef;
    private _portal: TemplatePortal;

    private _popupOpen: boolean = false;

    @Input('ocPopupTrigger') popupContent: OCPopup;

    constructor(private _overlay: Overlay,
                private _viewContainerRef: ViewContainerRef,
                private _elementRef: ElementRef) {
    }

    ngOnInit(): void {
        if (isFalsy(this.popupContent)) {
            throw new Error('No popup provided');
        }
    }

    @HostListener('click') public open() {
        if (this._popupOpen) {
            return;
        }

        this._createOverlay().attach(this._portal);

        this._popupOpen = true;
    }

    private _createOverlay(): OverlayRef {
        if (!this._overlayRef) {
            this._portal = new TemplatePortal(this.popupContent.content, this._viewContainerRef);
            let overlayConfig = {
                positionStrategy: this._position(),
                scrollStrategy: this._overlay.scrollStrategies.reposition()
            } as OverlayConfig;
            this._overlayRef = this._overlay.create(overlayConfig);
        }

        return this._overlayRef;
    }

    private _position(): ConnectedPositionStrategy {
        let originX: HorizontalConnectionPos = 'end';
        let originY: VerticalConnectionPos = 'top';

        return this._overlay.position()
            .connectedTo(this._elementRef, {originX, originY}, {overlayX: originX, overlayY: originY});
    }
}
