import {Config} from '../../config/Config';
import {Http} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function translateFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function configLoader(config: Config): () => Promise<any> {
    return () => config.load().toPromise();
}

export function translationLoader(translateService: TranslateService): () => Promise<any> {
    translateService.setDefaultLang('en');
    return () => translateService.use(translateService.getBrowserLang()).toPromise();
}
