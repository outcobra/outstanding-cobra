import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {RouteAnimationContainer} from './core/animations/route-animation-container';

@Component({
    selector: 'oc-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends RouteAnimationContainer implements OnInit {
    constructor(private _sanitizer: DomSanitizer,
                private _matIconRegistry: MatIconRegistry) {
        super();
    }

    ngOnInit() {
        this._matIconRegistry.addSvgIcon('average', this._sanitizer.bypassSecurityTrustResourceUrl('/assets/img/ic_average.svg'));
    }
}
