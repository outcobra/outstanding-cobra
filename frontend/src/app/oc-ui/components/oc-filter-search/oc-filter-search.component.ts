import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'oc-filter-search',
    templateUrl: './oc-filter-search.component.html',
    styleUrls: ['./oc-filter-search.component.scss']
})
export class OCFilterSearchComponent implements OnInit {
    @Input() public placeholder: string;
    @Output() public onSearch: EventEmitter<string> = new EventEmitter();
    @ViewChild(Input) input: Element;

    public searchForm: FormGroup;
    public showSearchField: boolean = false;

    public search$: Subject<string> = new Subject();

    constructor(private _formBuilder: FormBuilder,
                private _translateService: TranslateService) {
    }

    ngOnInit() {
        this.searchForm = this._formBuilder.group({
            search: []
        });

        this.placeholder = this._getGivenOrPlaceholder(this.placeholder);

        this.search$
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchStr => {
                this.onSearch.emit(searchStr);
                this.placeholder = this._getGivenOrPlaceholder(searchStr);
            });

        this.onSearch.subscribe(console.log);
    }

    private _getGivenOrPlaceholder(altPlaceholder: string) {
        return altPlaceholder || this._translateService.instant('i18n.common.action.search');
    }

    public openSearchField() {
        this.showSearchField = true;
    }
}
