import Router from 'express';
import AuthController from '../auth/auth.controller.js';
import ArticlesController from '../articles/articles.controller.js';
import checkAuth from '../middlewares/auth.middleware.js';

const router = new Router();

router.post('/auth/signup', AuthController.signup);
router.post('/auth/login', AuthController.login);
router.post('/auth/refresh', AuthController.refresh);

router.get('/articles', checkAuth, ArticlesController.findAll);
router.get('/articles/search/:searchTerm', checkAuth, ArticlesController.search);

export default router;
