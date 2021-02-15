
import {of as observableOf, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {InfoService} from '../../services/info.service';
import {Info} from '../../model/info.dto';

@Injectable()
export class MockInfoService extends InfoService {
    public readonly MOCK_INFO: Info = {
        git: {
            commit: {
                time: new Date(),
                id: "1"
            },
            branch: "develop"
        },
        build: {
            version: "1.0.0",
            artifact: "outcobra",
            name: "local-build",
            group: "",
            time: new Date()
        }
    };

    public getInfo(): Observable<Info> {
        return observableOf(this.MOCK_INFO);
    }

}
