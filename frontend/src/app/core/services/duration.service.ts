import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import * as humanizeDuration from "humanize-duration";


@Injectable()
export class DurationService {

    constructor(private _translationService: TranslateService) {
    }

    public humanizeMinutes(minutes: number): string {
        return this.humanizeSeconds(minutes * 60)
    }

    public humanizeSeconds(seconds: number): string {
        return humanizeDuration(seconds * 1000, this.getCurrentConfig());
    }

    private getCurrentConfig() {
        let config = {
            largest: 2,
            round: true,
            language: this._translationService.currentLang
        }
        return config
    }

    public humanizeHours(hours: number): string {
        return this.humanizeMinutes(hours * 60)
    }
}