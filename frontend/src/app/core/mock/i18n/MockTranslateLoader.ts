import {TranslateLoader} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class MockTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return Observable.of(null);
    }
}
