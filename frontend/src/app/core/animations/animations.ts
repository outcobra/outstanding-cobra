import {animate, animation, query, style, transition, trigger, useAnimation} from '@angular/animations';

const routerTiming = '500ms cubic-bezier(0.215, 0.610, 0.355, 1.000)';

const normalizeEntryAndLeave = animation([
    query(':enter, :leave', style({position: 'absolute', top: 0, left: 0, right: 0}))
]);

export const slideInOutAnimation = animation([
    query(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(routerTiming, style({transform: 'translateY(0%)'}))
    ]),
    query(':leave', [
        style({transform: 'translateY(0%)'}),
        animate(routerTiming, style({transform: 'translateY(100%)'}))
    ])
]);

export const fadeInOutAnimation = animation([
    query(':enter', [
        style({opacity: 0}),
        animate(routerTiming, style({opacity: 1}))
    ]),
    query(':leave', [
        animate(routerTiming, style({opacity: 0}))
    ])
]);

export const routeAnimation = trigger('routeAnimation', [
    transition('* => markAdd', [
        useAnimation(slideInOutAnimation),
        useAnimation(fadeInOutAnimation)
    ])
]);
