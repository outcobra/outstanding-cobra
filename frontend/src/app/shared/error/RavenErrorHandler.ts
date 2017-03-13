import * as Raven from 'raven-js';
import {ErrorHandler} from '@angular/core';

Raven
    .config('https://00e7fe8c3ae9488ba591314d7773b81a@sentry.pegnu.cloud/2')
    .install();

export class RavenErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        Raven.captureException(error.originalError);
        Raven.showReportDialog({});
    }
}
