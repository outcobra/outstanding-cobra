import {TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LOCATION_INITIALIZED} from '@angular/common';
import {Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export function translateFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export function translationLoader(translateService: TranslateService, injector: Injector): () => Promise<any> {
    return wrapInitializer(() => {
        translateService.setDefaultLang('en');
        return translateService.use(translateService.getBrowserLang()).toPromise();
    }, injector);
}

function wrapInitializer(func: () => Promise<any>, injector: Injector): () => Promise<any> {
    return () => new Promise(resolve =>
        injector.get(LOCATION_INITIALIZED, setTimeout(() => resolve(func())))
    );
}
