import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {isNotEmpty} from '../../../core/util/helper';

@Component({
    selector: 'i18n-markdown',
    template: `<markdown [path]="i18nPath"></markdown>`,
    encapsulation: ViewEncapsulation.Native
})
export class I18nMarkdownComponent implements OnInit {
    @Input() path: string;

    private _i18nPath: string;

    constructor(private _translateService: TranslateService) {
    }

    ngOnInit(): void {
        if (isNotEmpty(this.path)) {
            this._setPathForCurrentLang();
            this._translateService.onLangChange.subscribe(() => this._setPathForCurrentLang())
        }
    }

    private _setPathForCurrentLang(): void {
        let currentLang = this._translateService.currentLang;
        this._i18nPath = `${this.path}.${currentLang}.md`;
    }

    get i18nPath(): string {
        return this._i18nPath;
    }
}
