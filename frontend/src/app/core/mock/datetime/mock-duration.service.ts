import { Injectable } from '@angular/core';
import { DurationService } from '../../services/duration.service';

@Injectable()
export class MockDurationService extends DurationService {
  public humanizeHours(hours: number): string {
    return hours.toString();
  }

  public humanizeMinutes(minutes: number): string {
    return minutes.toString();
  }

  public humanizeSeconds(seconds: number): string {
    return seconds.toString();
  }
}
