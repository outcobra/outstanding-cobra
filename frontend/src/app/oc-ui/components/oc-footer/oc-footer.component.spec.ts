import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OCFooterComponent} from './oc-footer.component';
import {By} from '@angular/platform-browser';
import {MockInfoService} from '../../../core/mock/info/mock-info.service';
import {TestModule} from '../../../core/mock/test.module';
import {InfoService} from '../../../core/services/info.service';

describe('OCFooterComponent', () => {
    let component: OCFooterComponent;
    let fixture: ComponentFixture<OCFooterComponent>;
    let infoService: MockInfoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OCFooterComponent],
            imports: [
                TestModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        infoService = TestBed.get(InfoService);

        fixture = TestBed.createComponent(OCFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        let versionNumber = fixture.debugElement.query(By.css('#oc-version-number')).nativeElement;
        expect(versionNumber.textContent).toContain(infoService.MOCK_INFO.build.version);
    });
});
