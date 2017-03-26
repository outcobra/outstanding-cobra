import {Component, OnInit} from '@angular/core';
import {InfoService} from '../../services/info.service';
import {Info} from '../../model/Info';
import {MdDialog} from '@angular/material';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';
import {ResponsiveHelperService} from '../../services/ui/responsive-helper.service';
import {SMALL_DIALOG} from '../../util/const';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
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
