import {Directive, Input, OnInit} from '@angular/core';
import {OCPopup} from './oc-popup';
import {Overlay} from '@angular/cdk/overlay';
import {isFalsy} from '../../../core/util/helper';

@Directive({
    selector: '[ocPopupTrigger]'
})
export class OCPopupTrigger implements OnInit {
    @Input('ocPopupTrigger') popupContent: OCPopup;

    constructor(private _overlay: Overlay) {

    }

    ngOnInit(): void {
        if (isFalsy(this.popupContent)) {
            throw new Error('No popup provided');
        }

        let overlayRef = this._overlay.create();
        console.log(this.popupContent.content);
        overlayRef.attach(this.popupContent.content);
    }
}
