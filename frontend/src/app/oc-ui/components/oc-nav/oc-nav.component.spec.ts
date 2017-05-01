import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OCNavComponent} from './oc-nav.component';

describe('OCNavComponent', () => {
    let component: OCNavComponent;
    let fixture: ComponentFixture<OCNavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OCNavComponent],
            imports: [

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
