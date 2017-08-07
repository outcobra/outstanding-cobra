import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'oc-filter-search',
    templateUrl: './oc-filter-search.component.html',
    styleUrls: ['./oc-filter-search.component.scss']
})
export class OCFilterSearchComponent implements OnInit {
    @Input() public placeholder: string;
    @Output() public onSearch: EventEmitter<string> = new EventEmitter();

    constructor(private _translateService: TranslateService) {
    }

    ngOnInit() {
        this.placeholder = this.placeholder || this._translateService.instant('i18n.common.action.search');
    }
}
