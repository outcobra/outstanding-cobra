import { Component, Input, OnChanges, OnInit, Optional, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isTruthy } from '../../../core/util/helper';

type DisplayMode = 'flat' | 'card'

@Component({
  selector: 'i18n-markdown',
  templateUrl: './i18n-markdown.component.html',
  styleUrls: ['./i18n-markdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class I18nMarkdownComponent implements OnInit, OnChanges {
  @Input() path: string;
  @Input() displayMode: DisplayMode = 'flat';
  @Input() wrapperClasses: string[] = [];

  private _i18nPath: string;

  constructor(@Optional() private _route: ActivatedRoute,
              private _translateService: TranslateService) {
  }

  ngOnInit(): void {
    this._route.data.subscribe(data => {
      this.path = data.path;
      this.displayMode = data.displayMode || 'flat';
      this.wrapperClasses = data.wrapperClasses || [];
      if (!Array.isArray(this.wrapperClasses)) {
        throw new Error('wrapperClasses must be an array');
      }
      this.wrapperClasses.push(`style-${this.displayMode}`);
      this._setPathForCurrentLang();
    });

    this._translateService.onLangChange.subscribe(() => this._setPathForCurrentLang());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isTruthy(changes.path)) {
      this._setPathForCurrentLang();
    }
  }

  public getWrapperClasses(): string[] {
    return this.wrapperClasses;
  }

  private _setPathForCurrentLang(): void {
    let currentLang = this._translateService.currentLang;
    this._i18nPath = `${this.path}.${currentLang}.md`;
  }

  get i18nPath(): string {
    return this._i18nPath;
  }
}
