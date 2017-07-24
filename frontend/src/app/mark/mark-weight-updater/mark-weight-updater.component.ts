import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MarkGroupDto} from '../model/mark-group.dto';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'mark-weight-updater',
    templateUrl: './mark-weight-updater.component.html',
    styleUrls: ['./mark-weight-updater.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MarkWeightUpdaterComponent implements OnInit {
    @Input() markGroup: MarkGroupDto;
    private _weightUpdaterForm: FormGroup;

    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this._weightUpdaterForm = this._formBuilder.group({
            weight: [this.markGroup.weight]
        });
    }

    get weightUpdaterForm(): FormGroup {
        return this._weightUpdaterForm;
    }

}
