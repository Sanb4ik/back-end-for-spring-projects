import jwt from 'jsonwebtoken';
import { token } from '../constants/index.js';

export default function checkAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.sendStatus(401);
  }

  jwt.verify(accessToken, token.access.secret, (err) => {
    if (err) {
      return res.sendStatus(401);
    }

    next();
  });
}
