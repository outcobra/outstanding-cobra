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
    public appInfo: Info;

    constructor(private infoService: InfoService,
                private dialogService: MdDialog,
                private responsiveHelper: ResponsiveHelperService) {
    }

    ngOnInit() {
        this.infoService.getInfo()
            .subscribe(info => this.appInfo = info)
    }

    openInfoDialog() {
        let dialog = this.dialogService.open(InfoDialogComponent, this.responsiveHelper.getMobileOrGivenDialogConfig(SMALL_DIALOG));
        dialog.componentInstance.info = this.appInfo;
    }

}
