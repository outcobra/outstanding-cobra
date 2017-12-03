import {animate, group, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {Easing, time, Timing} from './timing';

const routerTiming = '500ms cubic-bezier(0.215, 0.610, 0.355, 1.000)';

/*const normalizeEntryAndLeave = animation([
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
*/

function fixContainers(positioning: 'absolute' | 'fixed' = 'fixed') {
    return query(':enter, :leave', style({
        position: positioning,
        width: '100%',
        height: '100%',
    }));
}

function placeEnterOverLeaveState() {
    return group([
        query(':enter', style({zIndex: 11})),
        query(':leave', style({zIndex: 10}))
    ])
}

function placeLeaveOverEnterState() {
    return group([
        query(':enter', style({zIndex: 10})),
        query(':leave', style({zIndex: 11}))
    ])
}


export const appLayoutRouteAnimation = trigger('appLayoutRouteAnimation', [
    transition(':enter', []),
    transition('task => taskCreateUpdate, exam => examCreateUpdate', [
        query(':self', style({position: 'relative'})),
        fixContainers('absolute'),
        placeEnterOverLeaveState(),
        query(':enter', style({transform: 'translateY(-100%)'})),
        group([
            query(':leave', animate(time(Timing.LEAVING, Easing.ACCELERATE), style({opacity: '0'}))),
            query(':enter', animate(time(Timing.ENTERING, Easing.DECELARATE), style({transform: 'translateY(0)'})))
        ])
    ])
]);

export const emptyLayoutRouteAnimation = trigger('emptyLayoutRouteAnimation', [
    transition(':enter', []),
    transition('auth => login, auth => signUp', [
        query(':enter', style({opacity: 0})),
        fixContainers(),
        placeLeaveOverEnterState(),

        group([
            query(':enter', [
                stagger(1000, animate(time(Timing.NORMAL, Easing.ACCELERATE),
                    style({
                        opacity: 1
                    }))
                )]
            ),
            query(':leave', [
                group([
                    query('.login', [
                        animate(time(Timing.NORMAL, Easing.ACCELERATE), style({transform: 'translateY(100%)'}))
                    ]),
                    query('.signup', [
                        animate(time(Timing.NORMAL, Easing.ACCELERATE), style({transform: 'translateY(-100%)'}))
                    ])
                ])
            ])
        ])
    ])
]);

export const topLevelRouteAnimation = trigger('topLevelRouteAnimation', [
    transition('empty => app', [
        fixContainers(),
        placeLeaveOverEnterState(),

        query(':leave', animate(time(Timing.NORMAL, Easing.ACCELERATE), style({transform: 'translateY(-100%)'})))
    ])
]);

export const loginSignupCollapse = trigger('loginSignupCollapse', [
    state('true', style({
        height: 0,
        overflow: 'hidden'
    })),
    transition('false => true', animate(time(Timing.NORMAL, Easing.STANDARD)))
]);

export const slideUpDownAnimation = trigger('slideUpDown', [
    state('1', style({
        height: '*',
        paddingTop: '*',
        paddingBottom: '*'
    })),
    state('0', style({
        height: '0',
        paddingTop: '0',
        paddingBottom: '0'
    })),
    transition('1 => 0', animate('250ms ease-in')),
    transition('0 => 1', animate('250ms ease-out'))
]);
