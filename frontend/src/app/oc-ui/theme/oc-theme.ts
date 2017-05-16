import {isNotNull} from '../../core/util/helper';
export class OCTheme {
    public static readonly OCEAN = new OCTheme('ocean', 'oc-theme-ocean');
    public static readonly BLOOD_ORANGE = new OCTheme('bloodorange', 'oc-theme-blood-orange');
    public static readonly LAVENDER = new OCTheme('lavender', 'oc-theme-lavender');

    private constructor(private _i18nKey: string,
                        private _className: string) {
    }


    get i18nKey(): string {
        return this._i18nKey;
    }

    get className(): string {
        return this._className;
    }

    public static getByI18nKey(i18nKey: string): OCTheme {
        return OCTheme.values().find(theme => theme.i18nKey === i18nKey);
    }

    public equals(theme: OCTheme): boolean {
        return isNotNull(theme) && this._i18nKey == theme._i18nKey && this._className == theme._className;
    }

    public static values(): Array<OCTheme> {
        return [
            OCTheme.OCEAN,
            OCTheme.BLOOD_ORANGE,
            OCTheme.LAVENDER
        ]
    }

}
