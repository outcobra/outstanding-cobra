import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class MockObservableMedia extends ObservableMedia {
    private observable: Observable<MediaChange> = Observable.of(
        new MediaChange()
    );

    isActive(query: string): boolean {
        return false;
    }

    asObservable(): Observable<MediaChange> {
        return this.observable;
    }

    subscribe(next?: (value: MediaChange) => void, error?: (error: any) => void, complete?: () => void): Subscription {
        return this.observable.subscribe(next, error, complete);
    }

}
