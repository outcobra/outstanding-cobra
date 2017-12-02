import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {emptyLayoutRouteAnimation} from '../../core/animations/animations';

@Component({
    selector: 'app-empty-layout',
    templateUrl: './empty-layout.component.html',
    styleUrls: ['./empty-layout.component.scss'],
    animations: [emptyLayoutRouteAnimation]
})
export class EmptyLayoutComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    public prepareRouteState(outlet: RouterOutlet): string {
        return outlet.activatedRouteData['animation'] || 'default';
    }
}
