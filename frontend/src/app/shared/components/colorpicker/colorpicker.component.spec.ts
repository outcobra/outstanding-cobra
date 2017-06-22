/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ColorpickerComponent} from './colorpicker.component';
import {TestModule} from '../../../core/mock/test.module';

describe('ColorpickerComponent', () => {
    let component: ColorpickerComponent;
    let fixture: ComponentFixture<ColorpickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ColorpickerComponent
            ],
            imports: [
                TestModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ColorpickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
