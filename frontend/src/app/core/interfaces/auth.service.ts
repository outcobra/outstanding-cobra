import {IdentityProvider} from '../services/auth/identity-provider';
import {UsernamePasswordDto} from '../../auth/model/username-password.dto';

export interface AuthService {
    loginWithMailAndPassword(usernamePassword: UsernamePasswordDto)
    loginIdentityProvider(identityProvider: IdentityProvider);
    logout();
    isLoggedIn();
}
