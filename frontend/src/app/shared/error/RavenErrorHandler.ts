import * as Raven from 'raven-js';
import {ErrorHandler} from '@angular/core';

Raven
    .config('https://07994a35a96f4713a3d69f15b968997c@sentry.pegnu.cloud/2')
    .install();

export class RavenErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        Raven.captureException(error.originalError);
    }
}
