import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {AppModule} from './app/';
import './rx-operators'
import {registerLocaleData} from '@angular/common';
import localeDeCh from '@angular/common/locales/de-CH';

if (environment.production) {
    enableProdMode();
}

registerLocaleData(localeDeCh);

platformBrowserDynamic().bootstrapModule(AppModule);
