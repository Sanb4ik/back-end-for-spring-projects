import jwt from 'jsonwebtoken';
// import { ParameterizedQuery } from 'pg-promise';

const users = [
  {
    id: 1,
    username: 'user',
    password: 'password',
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2',
  },
];

const secretKey = 'access_secret';
const refreshSecret = 'refresh_secret';

class AuthService {
  login(username, password, res) {
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const accessToken = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ userId: user.id }, refreshSecret, { expiresIn: '30d' });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

    res.json({ accessToken });
  }

  updateAccessToken(refreshToken, res) {
    if (!refreshToken) {
      return res.sendStatus(401);
    }

    try {
      const decoded = jwt.verify(refreshToken, refreshSecret);
      const accessToken = jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn: '30m' });
      res.json({ accessToken });
    } catch (error) {
      return res.sendStatus(403);
    }
  }
}

export default new AuthService();
