import AuthService from './auth.service.js';

class AuthController {
  login(req, res) {
    res.json(AuthService.login(req.body));
  }
}

export default new AuthController();
