import * as Raven from 'raven-js';
import {ErrorHandler} from '@angular/core';
import {environment} from '../../../environments/environment';

if (environment.production) {
    Raven
        .config('https://00e7fe8c3ae9488ba591314d7773b81a@sentry.pegnu.cloud/2')
        .install();
}

export class RavenErrorHandler implements ErrorHandler {


    /**
     * on a production environment the error will be captured by Raven/Sentry
     * in a development environment the error will only be logged
     * @param error
     */
    handleError(error: any): void {
        if (environment.production) {
            Raven.captureException(error.originalError);
            Raven.showReportDialog({});
        } else {
            console.error(error);
        }
    }
}
