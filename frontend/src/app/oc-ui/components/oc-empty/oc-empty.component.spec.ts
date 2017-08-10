import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OCEmptyComponent} from './oc-empty.component';
import {TestModule} from '../../../core/mock/test.module';
import {OCUiModule} from '../../oc-ui.module';

describe('OCEmptyComponent', () => {
    let component: OCEmptyComponent;
    let fixture: ComponentFixture<OCEmptyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule,
                OCUiModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OCEmptyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
