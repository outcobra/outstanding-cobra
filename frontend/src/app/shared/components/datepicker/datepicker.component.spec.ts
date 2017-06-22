/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DatepickerComponent} from './datepicker.component';
import {TestModule} from '../../../core/mock/test.module';
import {FormsModule} from '@angular/forms';
import {YearpickerComponent} from './yearpicker.component';
import {DaypickerComponent} from './daypicker.component';

describe('DatepickerComponent', () => {
    let component: DatepickerComponent;
    let fixture: ComponentFixture<DatepickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DatepickerComponent,
                YearpickerComponent,
                DaypickerComponent
            ],
            imports: [
                FormsModule,
                TestModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatepickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
