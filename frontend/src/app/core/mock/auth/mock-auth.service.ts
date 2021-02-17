import { Injectable } from '@angular/core';
import { UsernamePasswordDto } from '../../../auth/model/username-password.dto';
import { AuthService } from '../../interfaces/auth.service';
import { IdentityProvider } from '../../services/auth/identity-provider';

@Injectable()
export class MockAuthService implements AuthService {
  loginWithMailAndPassword(usernamePassword: UsernamePasswordDto) {
    throw new Error('Method not implemented.');
  }

  signUpWithMailAndPassword(usernamePassword: UsernamePasswordDto) {
    throw new Error('Method not implemented.');
  }

  loginIdentityProvider(identityProvider: IdentityProvider) {
    throw new Error('Method not implemented.');
  }

  signUpIdentityProvider(identityProvider: IdentityProvider) {
    throw new Error('Method not implemented.');
  }

  logout() {
    throw new Error('Method not implemented.');
  }

  isLoggedIn() {
    return false;
  }
}
