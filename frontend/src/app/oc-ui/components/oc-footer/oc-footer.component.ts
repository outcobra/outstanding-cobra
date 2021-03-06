import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {InfoDialogComponent} from '../../../shared/components/info-dialog/info-dialog.component';
import {ResponsiveHelperService} from '../../../core/services/ui/responsive-helper.service';
import {SMALL_DIALOG} from '../../../core/util/const';
import {Info} from '../../../core/model/info.dto';
import {InfoService} from '../../../core/services/info.service';

@Component({
    selector: 'oc-footer',
    templateUrl: './oc-footer.component.html',
    styleUrls: ['./oc-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OCFooterComponent implements OnInit {
    private _appInfo: Info;

    constructor(private _infoService: InfoService,
                private _dialogService: MatDialog,
                private _responsiveHelper: ResponsiveHelperService,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this._infoService.getInfo()
            .subscribe(info => {
                this._appInfo = info;
                this._changeDetectorRef.markForCheck();
            })
    }

    public openInfoDialog() {
        let dialog = this._dialogService.open(InfoDialogComponent, this._responsiveHelper.getMobileOrGivenDialogConfig(SMALL_DIALOG));
        dialog.componentInstance.info = this._appInfo;
    }

    get appInfo(): Info {
        return this._appInfo;
    }
}
