import Router from 'express';
import AuthController from '../auth/auth.controller.js';
import ArticlesController from '../articles/articles.controller.js';
import checkAuth from '../helpers/auth.helper.js';

const router = new Router();

router.post('/auth/login', checkAuth, AuthController.login);
router.get('/articles', ArticlesController.findAll);
router.get('/articles/search/:searchTerm', ArticlesController.search);

export default router;
