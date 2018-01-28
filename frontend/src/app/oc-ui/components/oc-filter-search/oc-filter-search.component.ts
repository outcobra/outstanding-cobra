import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ConnectionPositionPair} from '@angular/cdk/overlay';
import {isEmpty, isNotEmpty} from '../../../core/util/helper';

@Component({
    selector: 'oc-filter-search',
    templateUrl: './oc-filter-search.component.html',
    styleUrls: ['./oc-filter-search.component.scss']
})
export class OCFilterSearchComponent implements OnInit, OnDestroy {
    @Input() public placeholder: string;
    @Output('search') public onSearch: EventEmitter<string> = new EventEmitter();
    @ViewChild('searchFieldTrigger') trigger: ElementRef;

    private _currentPlaceholder: string;

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
            offsetX: 0,
            offsetY: 0
        }
    ];

    private _ngUnsubscribe: Subject<any> = new Subject();

    constructor(private _formBuilder: FormBuilder,
                private _translateService: TranslateService) {
    }

    ngOnInit() {
        this.searchForm = this._formBuilder.group({
            search: []
        });

        this._currentPlaceholder = this._getGivenOrPlaceholder(this.placeholder);
        this._refreshTriggerDimensions();

        this.search$
            .takeUntil(this._ngUnsubscribe)
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(searchStr => {
                this.onSearch.emit(searchStr);
                this._currentPlaceholder = this._getGivenOrPlaceholder(isNotEmpty(searchStr) ? searchStr : this.placeholder);
            });

        Observable.fromEvent(window, 'resize')
            .takeUntil(this._ngUnsubscribe)
            .subscribe(() => this._refreshTriggerDimensions());

        this._translateService.onLangChange
            .takeUntil(this._ngUnsubscribe)
            .subscribe(() => {
            if (isEmpty(this.placeholder) && isEmpty(this.searchForm.get('search').value)) {
                this._currentPlaceholder = this._getDefaultPlaceholder().call(this);
            }
        });
    }

    ngOnDestroy(): void {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public closeSearchField() {
        this.showSearchField = false;
    }

    public openSearchField() {
        this._refreshTriggerDimensions();
        this.showSearchField = true;
    }

    private _getGivenOrPlaceholder(altPlaceholder: string) {
        return altPlaceholder || this._getDefaultPlaceholder().call(this);
    }

    private _getDefaultPlaceholder() {
        return () => this._translateService.instant('i18n.common.action.search');
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

    get currentPlaceholder(): string {
        return this._currentPlaceholder;
    }
}
