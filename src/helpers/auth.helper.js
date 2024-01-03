import jwt from 'jsonwebtoken';

export default function checkAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'access_secret', (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    console.log(decoded);
    req.userId = decoded.userId;
    next();
  });
}
