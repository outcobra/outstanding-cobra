import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MarkGroupDto} from '../model/mark-group.dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WEIGHT_PATTERN} from '../service/mark.service';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';

@Component({
    selector: 'mark-weight-updater',
    templateUrl: './mark-weight-updater.component.html',
    styleUrls: ['./mark-weight-updater.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.active]': 'active',
        '[class.disabled]': 'disabled',
        '(click)': 'onHostClick()'
    }
})
export class MarkWeightUpdaterComponent implements OnInit {
    @Input() markGroup: MarkGroupDto;
    @Input() disabled: boolean = false;
    private _weightUpdaterForm: FormGroup;
    private _active: boolean = false;
    private _originalValue: number;

    @Output('weightChange') change = new EventEmitter<MarkGroupDto>();

    constructor(private _formBuilder: FormBuilder,
                private _notificationsService: NotificationWrapperService) {
    }

    ngOnInit() {
        this._originalValue = this.markGroup.weight;
        this._weightUpdaterForm = this._formBuilder.group({
            weight: [this.markGroup.weight, Validators.pattern(WEIGHT_PATTERN)]
        });
        this.change.subscribe(markGroup => this._originalValue = markGroup.weight);
    }

    public submit(event) {
        if (this._weightUpdaterForm.pristine) {
            this.close(event);
        }
        if (this._weightUpdaterForm.invalid) {
            this._notificationsService.error('i18n.common.form.error.title', 'i18n.modules.mark.createUpdate.form.weight.error.pattern');
            return;
        }
        this.markGroup.weight = parseFloat(this._weightUpdaterForm.value['weight']);
        this.change.emit(this.markGroup);
        this.close(event);
    }

    public close(event: Event) {
        event.stopPropagation();
        this._active = false;
        if (this._weightUpdaterForm.touched) {
            this._weightUpdaterForm.reset({weight: this._originalValue});
        }
    }

    public onHostClick() {
        if (!this.disabled) {
            this._active = true;
        }
    }

    get weightUpdaterForm(): FormGroup {
        return this._weightUpdaterForm;
    }

    get active(): boolean {
        return this._active;
    }
}
