
import {of as observableOf, Observable} from 'rxjs';
import {TranslateLoader} from '@ngx-translate/core';
import {Injectable} from '@angular/core';

@Injectable()
export class MockTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return observableOf(null);
    }
}
