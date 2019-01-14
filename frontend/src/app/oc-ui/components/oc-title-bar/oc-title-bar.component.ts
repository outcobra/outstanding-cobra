import {Component, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'oc-title-bar',
    templateUrl: './oc-title-bar.component.html',
    styleUrls: ['./oc-title-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'oc-title-bar'
    }
})
export class OCTitleBarComponent {
}
