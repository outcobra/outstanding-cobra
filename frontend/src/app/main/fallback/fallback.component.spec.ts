import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FallbackComponent} from './fallback.component';

describe('FallbackComponent', () => {
    let component: FallbackComponent;
    let fixture: ComponentFixture<FallbackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FallbackComponent]
        })
            .compileComponents();
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
