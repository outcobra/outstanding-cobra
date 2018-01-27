import {animate, animation, group, query, state, style, transition, trigger, useAnimation} from '@angular/animations';
import {Easing, time, Timing} from './timing';

export const fadeInOutAnimation = animation([
    fixContainers('absolute'),
    placeLeaveOverEnterState(),

    group([
        query(':enter :not(oc-title-bar)', [
            style({opacity: 0}),
            animate(time(), style({opacity: 1}))
        ]),
        query(':leave :not(oc-title-bar)', [
            animate(time(), style({opacity: 0}))
        ])
    ])
]);

export function fixContainers(positioning: 'absolute' | 'fixed' = 'fixed') {
    return query(':enter, :leave', style({
        overflow: 'hidden',
        position: positioning,
        width: '100%',
        height: '100%',
    }));
}

export function placeEnterOverLeaveState() {
    return group([
        query(':enter', style({zIndex: 11})),
        query(':leave', style({zIndex: 10}))
    ])
}

export function placeLeaveOverEnterState() {
    return group([
        query(':enter', style({zIndex: 10})),
        query(':leave', style({zIndex: 11}))
    ])
}


export const appLayoutRouteAnimation = trigger('appLayoutRouteAnimation', [
    transition('void => *', []),
    transition('task => taskCreateUpdate, exam => examCreateUpdate, mark => markCreateUpdate, mark => markGroupCreateUpdate', [
        query(':self', style({position: 'relative'})),
        fixContainers('absolute'),
        placeEnterOverLeaveState(),
        query(':enter', style({transform: 'translateY(-100%)'})),
        group([
            query(':leave', animate(time(Timing.LEAVING, Easing.ACCELERATE), style({opacity: '0'}))),
            query(':enter', animate(time(Timing.ENTERING, Easing.DECELARATE), style({transform: 'translateY(0)'})))
        ])
    ]),
    transition('taskCreateUpdate => *, examCreateUpdate => *, markCreateUpdate => *, markGroupCreateUpdate => *', [
        fixContainers('absolute'),
        placeLeaveOverEnterState(),
        query(':leave', animate(time(Timing.NORMAL, Easing.ACCELERATE), style({transform: 'translateY(-100%)'})))
    ]),
    transition('* => *', useAnimation(fadeInOutAnimation))
]);

export const emptyLayoutRouteAnimation = trigger('emptyLayoutRouteAnimation', [
    transition(':enter', []),
    transition('auth => login, auth => signUp', [
        query(':enter', style({opacity: 0})),
        fixContainers(),
        placeLeaveOverEnterState(),

        group([
            query(':enter', animate(time(Timing.NORMAL, Easing.STANDARD), style({opacity: 1}))),
            query(':leave .login', [
                animate(time(Timing.NORMAL, Easing.ACCELERATE), style({transform: 'translateY(100%)'}))
            ]),
            query(':leave .signup', [
                animate(time(Timing.NORMAL, Easing.ACCELERATE), style({transform: 'translateY(-100%)'}))
            ])
        ])
    ]),
    transition('* => auth', [
        fixContainers(),
        placeEnterOverLeaveState(),

        query(':enter .login', style({transform: 'translateY(50%)'})),
        query(':enter .signup', style({transform: 'translateY(-50%)'})),

        group([
            query(':leave', animate(time(Timing.NORMAL, Easing.STANDARD), style({opacity: 0}))),
            query(':enter .login', [
                animate(time(Timing.NORMAL, Easing.ACCELERATE), style({transform: 'translateY(0)'}))
            ]),
            query(':enter .signup', [
                animate(time(Timing.NORMAL, Easing.ACCELERATE), style({transform: 'translateY(0)'}))
            ])
        ])
    ])
]);

export const topLevelRouteAnimation = trigger('topLevelRouteAnimation', [
    transition('empty => app', [
        fixContainers(),
        placeLeaveOverEnterState(),

        query(':leave', animate(time('750ms', Easing.ACCELERATE), style({transform: 'translateY(-100%)'})))
    ])
]);

export const loginSignupCollapse = trigger('loginSignupCollapse', [
    state('true', style({
        height: 0,
        overflow: 'hidden'
    })),
    transition('false => true', animate(time()))
]);
