/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {OCEntityMenuComponent} from './oc-entity-menu.component';
import {TestModule} from '../../../core/mock/test.module';

describe('EntityMenuComponent', () => {
    let component: OCEntityMenuComponent;
    let fixture: ComponentFixture<OCEntityMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                OCEntityMenuComponent
            ],
            imports: [
                TestModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OCEntityMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
