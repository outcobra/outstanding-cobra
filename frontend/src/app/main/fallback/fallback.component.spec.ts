import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FallbackComponent} from './fallback.component';
import {TestModule} from '../../core/mock/test.module';
import {OCUiModule} from '../../oc-ui/oc-ui.module';

describe('FallbackComponent', () => {
    let component: FallbackComponent;
    let fixture: ComponentFixture<FallbackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FallbackComponent
            ],
            imports: [
                TestModule,
                OCUiModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FallbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
