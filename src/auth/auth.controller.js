import AuthService from './auth.service.js';

class AuthController {
  login(req, res) {
    const { username, password } = req.body;
    res.json(AuthService.login(username, password, res));
  }

  refresh(req, res) {
    const refreshToken = req.cookies['refresh_token'];
    res.json(AuthService.updateAccessToken(refreshToken, res));
  }
}

export default new AuthController();
