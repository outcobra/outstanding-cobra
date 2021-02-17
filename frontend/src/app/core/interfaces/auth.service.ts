import { UsernamePasswordDto } from '../../auth/model/username-password.dto';
import { IdentityProvider } from '../services/auth/identity-provider';

export interface AuthService {
  loginWithMailAndPassword(usernamePassword: UsernamePasswordDto)

  signUpWithMailAndPassword(usernamePassword: UsernamePasswordDto)

  loginIdentityProvider(identityProvider: IdentityProvider, token: string);

  signUpIdentityProvider(identityProvider: IdentityProvider, token: string);

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
