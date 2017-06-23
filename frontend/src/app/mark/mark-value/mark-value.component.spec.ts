import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {MarkValueComponent} from './mark-value.component';
import {TestModule} from '../../core/mock/test.module';

describe('MarkValueComponent', () => {
    let component: MarkValueComponent;
    let fixture: ComponentFixture<MarkValueComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MarkValueComponent
            ],
            imports: [
                TestModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkValueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
