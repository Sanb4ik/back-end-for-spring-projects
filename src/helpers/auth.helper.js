export default function checkAuth(req, res, next) {
  const user = req.body;
  const isAuthenticated = user.password === '1234' && user.userName === 'admin';
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return res.status(401).send('Unauthorized');
  }

  next();
}
