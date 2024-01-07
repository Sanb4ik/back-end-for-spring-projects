import jwt from 'jsonwebtoken';
import { db } from '../config/db_connection.js';
import { token } from '../constants/index.js';

class AuthService {
  async signup(username, password, first_name, last_name, age, res) {
    const user = await db.oneOrNone('SELECT * FROM Users WHERE username = $1', [username]);
    if (!user) {
      const addUserQuery =
        'INSERT INTO Users(username, password, first_name, last_name, age) VALUES($1, $2, $3, $4, $5)';

      await db.none(addUserQuery, [username, password, first_name, last_name, age]);
      return res.sendStatus(201);
    }
    return res.status(401).json({ message: { username: 'User already exist' } });
  }

  async login(username, password, res) {
    const user = await db.oneOrNone('SELECT * FROM Users WHERE username = $1 AND password = $2', [
      username,
      password,
    ]);

    if (!user) {
      return res.status(401).json({ message: { username: 'Invalid credentials' } });
    }
    const accessToken = jwt.sign({ userId: user.id, username: username }, token.access.secret, {
      expiresIn: token.access.expiresIn,
    });
    const refreshToken = jwt.sign({ userId: user.id, username: username }, token.refresh.secret, {
      expiresIn: token.refresh.expiresIn,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: 'strict',
    });

    res.json({ accessToken });
  }

  updateAccessToken(refreshToken, res) {
    if (!refreshToken) {
      return res.sendStatus(403);
    }

    try {
      const decoded = jwt.verify(refreshToken, token.refresh.secret);
      const accessToken = jwt.sign(
        { userId: decoded.userId, username: decoded.username },
        token.access.secret,
        {
          expiresIn: token.access.expiresIn,
        },
      );
      res.json({ accessToken });
    } catch (error) {
      return res.sendStatus(401);
    }
  }
}

export default new AuthService();
