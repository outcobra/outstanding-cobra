import {Component} from '@angular/core';
import {emptyLayoutRouteAnimation} from '../../core/animations/animations';
import {RouteAnimationContainer} from '../../core/animations/route-animation-container';

@Component({
    selector: 'app-empty-layout',
    templateUrl: './empty-layout.component.html',
    styleUrls: ['./empty-layout.component.scss'],
    animations: [emptyLayoutRouteAnimation]
})
export class EmptyLayoutComponent extends RouteAnimationContainer {
}
