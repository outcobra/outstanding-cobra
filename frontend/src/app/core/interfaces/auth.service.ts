import {IdentityProvider} from '../services/auth/identity-provider';

export interface AuthService {
    loginWithUsername(username: string, password: string)
    loginIdentityProvider(identityProvider: IdentityProvider);
    logout();
    isLoggedIn();
}
