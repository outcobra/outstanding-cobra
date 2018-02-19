import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {MarkGroupDto} from '../model/mark-group.dto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WEIGHT_PATTERN} from '../service/mark.service';
import {NotificationWrapperService} from '../../core/notifications/notification-wrapper.service';
import {ConnectionPositionPair} from '@angular/cdk/overlay';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'mark-weight-updater',
    templateUrl: './mark-weight-updater.component.html',
    styleUrls: ['./mark-weight-updater.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.active]': 'active',
        '[class.disabled]': 'disabled'
    }
})
export class MarkWeightUpdaterComponent implements OnInit {
    @Input() markGroup: MarkGroupDto;
    @Input() disabled: boolean = false;
    private _weightUpdaterForm: FormGroup;
    private _active: boolean = false;
    private _originalValue: number;

    @Output('weightChange') change = new EventEmitter<MarkGroupDto>();
    @ViewChild('weightFieldTrigger') trigger: ElementRef;

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

    constructor(private _formBuilder: FormBuilder,
                private _notificationsService: NotificationWrapperService) {
    }

    ngOnInit() {
        this._originalValue = this.markGroup.weight;
        this._weightUpdaterForm = this._formBuilder.group({
            weight: [this.markGroup.weight, Validators.pattern(WEIGHT_PATTERN)]
        });
        this.change
            .filter(() => !this.disabled)
            .subscribe(markGroup => this._originalValue = markGroup.weight);

        Observable.fromEvent(window, 'resize')
            .subscribe(() => this._refreshTriggerDimensions());
    }

    public submit() {
        if (this._weightUpdaterForm.pristine) {
            this.closeWeightField();
        }
        if (this._weightUpdaterForm.invalid) {
            this._notificationsService.error('i18n.common.form.error.title', 'i18n.modules.mark.createUpdate.form.weight.error.pattern');
            return;
        }
        this.markGroup.weight = parseFloat(this._weightUpdaterForm.value['weight']);
        this.change.emit(this.markGroup);
        this.closeWeightField();
    }

    public openWeightField() {
        if (!this.disabled) {
            this._refreshTriggerDimensions();
            this._active = true;
        }
    }

    public closeWeightField() {
        this._active = false;
        if (this._weightUpdaterForm.touched) {
            this._weightUpdaterForm.reset({weight: this._originalValue});
        }
    }

    private _refreshTriggerDimensions() {
        let clientRect = this.trigger.nativeElement.getBoundingClientRect();
        this._triggerWidth = clientRect.width;
        this._triggerHeight = clientRect.height;
    }

    get weightUpdaterForm(): FormGroup {
        return this._weightUpdaterForm;
    }

    get active(): boolean {
        return this._active;
    }

    get triggerWidth(): number {
        return this._triggerWidth;
    }

    get triggerHeight(): number {
        return this._triggerHeight;
    }

    get positions(): ConnectionPositionPair[] {
        return this._positions;
    }
}
