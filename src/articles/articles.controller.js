import ArticlesService from './articles.service.js';

class ArticleController {
  findAll(req, res) {
    res.json(ArticlesService.find());
  }

  search(req, res) {
    const searchTerm = req.params.searchTerm;
    res.json(ArticlesService.search(searchTerm));
  }
}

export default new ArticleController();
