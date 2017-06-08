import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {InfoService} from '../../services/info.service';
import {Info} from '../../model/Info';

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
        return Observable.of(this.MOCK_INFO);
    }

}
