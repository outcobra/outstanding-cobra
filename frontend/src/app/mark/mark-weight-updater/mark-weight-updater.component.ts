import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MarkGroupDto} from '../model/mark-group.dto';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

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
    private _originalValue: number;

    @Output() public change: EventEmitter<number> = new EventEmitter();

    constructor(private _formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this._originalValue = this.markGroup.weight;
        this._weightUpdaterForm = this._formBuilder.group({
            weight: [this.markGroup.weight]
        });
    }

    public submit(event) {
        if (this._weightUpdaterForm.pristine) {
            this.close(event);
        }
    }

    public close(event: Event) {
        event.stopPropagation();
        this._active = false;
        this._weightUpdaterForm.reset({weight: this._originalValue});
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
