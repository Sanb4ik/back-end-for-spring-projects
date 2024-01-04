import AuthService from './auth.service.js';

class AuthController {
  async signup(req, res) {
    const { username, password, first_name, last_name, age } = req.body;
    await AuthService.signup(username, password, first_name, last_name, age, res);
  }

  async login(req, res) {
    const { username, password } = req.body;
    await AuthService.login(username, password, res);
  }

  refresh(req, res) {
    const refreshToken = req.cookies['refresh_token'];
    AuthService.updateAccessToken(refreshToken, res);
  }
}

export default new AuthController();
