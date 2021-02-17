import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, of as observableOf, Subscription } from 'rxjs';

@Injectable()
export class MockMediaObserver extends MediaObserver {
  private observable: Observable<MediaChange[]> = observableOf(
    [new MediaChange()]
  );

  isActive(query: string): boolean {
    return false;
  }

  asObservable(): Observable<MediaChange[]> {
    return this.observable;
  }

  subscribe(next?: (value: MediaChange[]) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this.observable.subscribe(next, error, complete);
  }

}
