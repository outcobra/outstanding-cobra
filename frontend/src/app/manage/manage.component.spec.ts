/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, ComponentFixtureAutoDetect, inject, TestBed} from '@angular/core/testing';
import {ManageComponent} from './manage.component';
import {TestModule} from '../core/mock/test.module';
import {OCUiModule} from '../oc-ui/oc-ui.module';
import {EntityMenuComponent} from './entity-menu/entity-menu.component';
import {ManageService} from './service/manage.service';

describe('ManagerComponent', () => {
    let component: ManageComponent;
    let fixture: ComponentFixture<ManageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ManageComponent,
                EntityMenuComponent
            ],
            imports: [
                TestModule,
                OCUiModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        //Promise.resolve(null).then(() => fixture.detectChanges()); // prevent 'Expression has changed after it was checked' error
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should provide data', inject([ManageService], (manageService: ManageService) => {
        manageService.getManageData()
            .subscribe(data => {
                expect(data).toBeTruthy();
            })
    }));
});
