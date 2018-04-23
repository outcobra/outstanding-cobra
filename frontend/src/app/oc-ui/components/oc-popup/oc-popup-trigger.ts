import {
    AfterContentInit, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit,
    ViewContainerRef
} from '@angular/core';
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
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';

@Directive({
    selector: '[ocPopupTrigger]'
})
export class OCPopupTrigger implements OnInit, OnDestroy, AfterContentInit {
    private _overlayRef: OverlayRef;
    private _portal: TemplatePortal;

    private _popupOpen: boolean = false;

    @Input('ocPopupTrigger') popup: OCPopup;

    constructor(private _overlay: Overlay,
                private _viewContainerRef: ViewContainerRef,
                private _elementRef: ElementRef) {
    }

    ngOnInit(): void {
        if (isFalsy(this.popup)) {
            throw new Error('No popup provided');
        }
    }

    ngAfterContentInit(): void {
        this.popup.close.subscribe(() => this._destroyPopup());
    }

    ngOnDestroy(): void {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    @HostListener('click')
    public open() {
        if (this._popupOpen) {
            return;
        }

        this._createOverlay()
            .attach(this._portal);

        this._popupClosingActions().subscribe(() => this.close());

        this._popupOpen = true;
    }

    public close() {
        this.popup.close.emit();
    }

    private _destroyPopup() {
        if (!this._overlayRef && !this._popupOpen) {
            return
        }

        this._overlayRef.detach();
        this._popupOpen = false;
    }

    private _createOverlay(): OverlayRef {
        if (!this._overlayRef) {
            this._portal = new TemplatePortal(this.popup.content, this._viewContainerRef);
            let overlayConfig = {
                hasBackdrop: this.popup.hasBackdrop,
                backdropClass: this.popup.backdropClass || 'cdk-overlay-transparent-backdrop',
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

    private _popupClosingActions(): Observable<any> {
        const backdrop = this._overlayRef!.backdropClick();
        const detachments = this._overlayRef!.detachments();
        return  merge(backdrop, detachments);
    }
}
