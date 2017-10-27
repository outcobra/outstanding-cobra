// Timings for animations
// Source: https://material.io/guidelines/motion/duration-easing.html

export function time(timing: Timing, easing: Easing) {
    return `${timing} ${easing}`;
}

export class Timing {
    public static readonly NORMAL = '375ms';
    public static readonly ENTERING = '225ms';
    public static readonly LEAVING = '195ms';
}

export class Easing {
    public static readonly STANDARD = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
    public static readonly DECELARATE = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
    public static readonly ACCELERATE = 'cubic-bezier(0.4, 0.0, 1, 1)';
    public static readonly SHARP = 'cubic-bezier(0.4, 0.0, 0.6, 1)';
}