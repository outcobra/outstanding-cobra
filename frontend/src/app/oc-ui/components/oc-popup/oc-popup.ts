import {Component, TemplateRef, ViewChild} from '@angular/core';

@Component({
    selector: 'oc-popup',
    templateUrl: './oc-popup.html',
    styleUrls: ['./oc-popup.scss'],
    exportAs: 'ocPopup'
})
export class OCPopup {
    @ViewChild(TemplateRef) content: TemplateRef<any>;
}
