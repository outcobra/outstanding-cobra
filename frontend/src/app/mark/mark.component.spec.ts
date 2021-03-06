/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MarkComponent} from './mark.component';
import {TestModule} from '../core/mock/test.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('MarkComponent', () => {
    let component: MarkComponent;
    let fixture: ComponentFixture<MarkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MarkComponent
            ],
            imports: [
                TestModule,
                OCUiModule,
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
