// Timings for animations
// Source: https://material.io/guidelines/motion/duration-easing.html

export function time(timing: Timing, easing: Easing) {
    return `${timing} ${easing}`;
}

export enum Timing {
    NORMAL = '375ms',
    ENTERING = '225ms',
    LEAVING = '195ms',
}

export enum Easing {
    STANDARD = 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    DECELARATE = 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    ACCELERATE = 'cubic-bezier(0.4, 0.0, 1, 1)',
    SHARP = 'cubic-bezier(0.4, 0.0, 0.6, 1)'
}
