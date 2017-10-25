import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'oc-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    constructor(private _sanitizer: DomSanitizer,
                private _matIconRegistry: MatIconRegistry) {
    }

    ngOnInit() {
        this._matIconRegistry.addSvgIcon('average', this._sanitizer.bypassSecurityTrustResourceUrl('/assets/img/ic_average.svg'));
    }
}
