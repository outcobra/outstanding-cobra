import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConnectionPositionPair} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'oc-filter-search',
    templateUrl: './oc-filter-search.component.html',
    styleUrls: ['./oc-filter-search.component.scss']
})
export class OCFilterSearchComponent implements OnInit {
    @Input() public placeholder: string;
    @Output('search') public onSearch: EventEmitter<string> = new EventEmitter();
    @ViewChild('searchFieldTrigger') trigger: ElementRef;

    public searchForm: FormGroup;
    public showSearchField: boolean = false;

    public search$: Subject<string> = new Subject();

    private _triggerWidth: number;
    private _triggerHeight: number;

    private _positions: ConnectionPositionPair[] = [
        {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
        }
    ];

    constructor(private _formBuilder: FormBuilder,
                private _translateService: TranslateService) {
    }

    ngOnInit() {
        this.searchForm = this._formBuilder.group({
            search: []
        });

        this.placeholder = this._getGivenOrPlaceholder(this.placeholder);
        this._refreshTriggerDimensions();

        this.search$
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchStr => {
                this.onSearch.emit(searchStr);
                this.placeholder = this._getGivenOrPlaceholder(searchStr);
            });

        Observable.fromEvent(window, 'resize')
            .subscribe(() => this._refreshTriggerDimensions());
    }

    public closeSearchField() {
        this.showSearchField = false;
    }

    public openSearchField() {
        this._refreshTriggerDimensions();
        this.showSearchField = true;
    }

    private _getGivenOrPlaceholder(altPlaceholder: string) {
        return altPlaceholder || this._translateService.instant('i18n.common.action.search');
    }

    private _refreshTriggerDimensions() {
        let clientRect = this.trigger.nativeElement.getBoundingClientRect();
        this._triggerWidth = clientRect.width;
        this._triggerHeight = clientRect.height;
    }

    get positions(): ConnectionPositionPair[] {
        return this._positions;
    }

    get triggerHeight(): number {
        return this._triggerHeight;
    }

    get triggerWidth(): number {
        return this._triggerWidth;
    }
}
