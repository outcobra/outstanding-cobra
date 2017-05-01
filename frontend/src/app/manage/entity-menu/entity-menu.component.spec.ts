/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EntityMenuComponent} from './entity-menu.component';
import {TestModule} from '../../core/mock/test.module';

describe('EntityMenuComponent', () => {
    let component: EntityMenuComponent;
    let fixture: ComponentFixture<EntityMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EntityMenuComponent
            ],
            imports: [
                TestModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EntityMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
