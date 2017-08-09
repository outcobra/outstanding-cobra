import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OCFilterSearchComponent} from './oc-filter-search.component';
import {TestModule} from '../../../core/mock/test.module';
import {OCUiModule} from '../../oc-ui.module';

describe('OCFilterSearchComponent', () => {
    let component: OCFilterSearchComponent;
    let fixture: ComponentFixture<OCFilterSearchComponent>;

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
        fixture = TestBed.createComponent(OCFilterSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
