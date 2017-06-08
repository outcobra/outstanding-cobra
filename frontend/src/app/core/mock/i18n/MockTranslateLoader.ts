import {TranslateLoader} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MockTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return Observable.of(null);
    }
}
