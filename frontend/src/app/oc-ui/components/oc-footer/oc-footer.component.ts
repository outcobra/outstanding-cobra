import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {InfoDialogComponent} from '../../../shared/components/info-dialog/info-dialog.component';
import {ResponsiveHelperService} from '../../../shared/services/ui/responsive-helper.service';
import {SMALL_DIALOG} from '../../../shared/util/const';
import {Info} from '../../../shared/model/Info';
import {InfoService} from '../../../shared/services/info.service';

@Component({
    selector: 'oc-footer',
    templateUrl: './oc-footer.component.html',
    styleUrls: ['./oc-footer.component.scss']
})
export class OCFooterComponent implements OnInit {
    private _appInfo: Info;

    constructor(private _infoService: InfoService,
                private _dialogService: MdDialog,
                private _responsiveHelper: ResponsiveHelperService) {
    }

    ngOnInit() {
        this._infoService.getInfo()
            .subscribe(info => this._appInfo = info)
    }

    public openInfoDialog() {
        let dialog = this._dialogService.open(InfoDialogComponent, this._responsiveHelper.getMobileOrGivenDialogConfig(SMALL_DIALOG));
        dialog.componentInstance.info = this._appInfo;
    }

    get appInfo(): Info {
        return this._appInfo;
    }
}
