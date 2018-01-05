import {IdentityProvider} from '../services/auth/identity-provider';
import {UsernamePasswordDto} from '../../auth/model/username-password.dto';

export interface AuthService {
    loginWithMailAndPassword(usernamePassword: UsernamePasswordDto)
    signUpWithMailAndPassword(usernamePassword: UsernamePasswordDto)
    loginIdentityProvider(identityProvider: IdentityProvider);
    signUpIdentityProvider(identityProvider: IdentityProvider);

    /**
     * logs the user out and removes the corresponding persistence items
     *
     * redirects to the home
     */
    logout();

    /**
     * checks whether a not expired valid JWT-Token is stored in the persistence store
     *
     * @returns {boolean}
     */
    isLoggedIn();
}
