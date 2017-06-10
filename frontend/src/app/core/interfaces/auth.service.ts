export interface AuthService {
    login(redirectRoute: string);
    logout();
    isLoggedIn();
}
