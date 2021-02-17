/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {ColorpickerComponent} from './colorpicker.component';
import {TestModule} from '../../../core/mock/test.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('ColorpickerComponent', () => {
    let component: ColorpickerComponent;
    let fixture: ComponentFixture<ColorpickerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ColorpickerComponent
            ],
            imports: [
                TestModule,
                RouterTestingModule
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
