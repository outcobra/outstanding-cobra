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

export const emptyLayoutRouteAnimation = trigger('emptyLayoutRouteAnimation', [
    transition(':enter', []),
    transition('auth => login, auth => signUp', [
        query(':enter', style({opacity: 0})),
        query(':enter, :leave', style({
            position: 'fixed',
            width: '100%',
            height: '100%',
        })),
        query(':leave', style({zIndex: '100'})),

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
