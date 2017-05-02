import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OCNavComponent} from './oc-nav.component';
import {TestModule} from '../../../core/mock/test.module';
import {RouterTestingModule} from '@angular/router/testing';
import {OCUiModule} from '../../oc-ui.module';

describe('OCNavComponent', () => {
    let component: OCNavComponent;
    let fixture: ComponentFixture<OCNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                OCUiModule,
                TestModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OCNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
