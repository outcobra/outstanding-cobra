import {Config} from '../../config/Config';
import {Http} from '@angular/http';
import {TranslateStaticLoader, TranslateService} from 'ng2-translate';

export function translateFactory(http: Http) {
    return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

export function configLoader(config: Config): () => Promise<any> {
    return () => config.load()
}

export function translationLoader(translateService: TranslateService): () => Promise<any> {
    translateService.setDefaultLang('en');
    return () => translateService.use(translateService.getBrowserLang()).toPromise();
}
