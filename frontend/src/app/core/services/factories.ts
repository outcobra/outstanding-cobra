import {ConfigService} from '../config/config.service';
import {Http} from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LOCATION_INITIALIZED} from '@angular/common';
import {Injector} from '@angular/core';

export function translateFactory(http: Http) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function configLoader(config: ConfigService, injector: Injector): () => Promise<any> {
    return wrapInitializer(() => config.load().toPromise(), injector);
}

export function translationLoader(translateService: TranslateService, injector: Injector): () => Promise<any> {
    return wrapInitializer(() => {
        translateService.setDefaultLang('en');
        return translateService.use(translateService.getBrowserLang()).toPromise();
    }, injector);
}

function wrapInitializer(func: () => Promise<any>, injector: Injector): () => Promise<any> {
    return () => new Promise(resolve => {
        const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
        locationInitialized.then(() => resolve(func()));
    });
}
