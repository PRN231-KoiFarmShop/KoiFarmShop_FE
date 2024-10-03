import ApiService from './ApiService';

class AuthService {
  constructor() {
    this.authPath = 'auth/';
  }

  signUp(signUpData) {
    return ApiService.post(`${this.authPath}sign-up`, signUpData);
  }

  login(loginData) {
    return ApiService.post(`${this.authPath}login`, loginData);
  }
}

export default new AuthService();
