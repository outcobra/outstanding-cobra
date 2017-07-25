import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MarkGroupDto} from '../model/mark-group.dto';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'mark-weight-updater',
    templateUrl: './mark-weight-updater.component.html',
    styleUrls: ['./mark-weight-updater.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.active]': 'active',
        '(document: click)': 'onDocumentClick($event)',
        '(click)': 'onHostClick()'
    }
})
export class MarkWeightUpdaterComponent implements OnInit {
    @Input() markGroup: MarkGroupDto;
    private _weightUpdaterForm: FormGroup;
    private _active: boolean = false;

    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this._weightUpdaterForm = this._formBuilder.group({
            weight: [this.markGroup.weight]
        });
    }

    public onHostClick() {
        this._active = true;
    }

    public onDocumentClick() {

    }

    get weightUpdaterForm(): FormGroup {
        return this._weightUpdaterForm;
    }

    get active(): boolean {
        return this._active;
    }
}
