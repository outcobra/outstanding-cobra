import {Injectable} from '@angular/core';
import {AuthService} from '../../../shared/interfaces/auth.service';

@Injectable()
export class MockAuthService implements AuthService {
    login(redirectRoute: string) {
        throw new Error('Method not implemented.');
    }

    logout() {
        throw new Error('Method not implemented.');
    }

    isLoggedIn() {
        throw new Error('Method not implemented.');
    }

}
