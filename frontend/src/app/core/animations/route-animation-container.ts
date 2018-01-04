import {RouterOutlet} from '@angular/router';

export abstract class RouteAnimationContainer {
    public prepareRouteState(outlet: RouterOutlet): string {
        return outlet.activatedRouteData['animation'] || 'default';
    }
}
