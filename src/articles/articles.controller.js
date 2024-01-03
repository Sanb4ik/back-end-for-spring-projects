import ArticlesService from './articles.service.js';

class ArticleController {
  async findAll(req, res) {
    res.json(await ArticlesService.find());
  }

  async search(req, res) {
    const searchTerm = req.params.searchTerm;
    res.json(await ArticlesService.search(searchTerm));
  }
}

export default new ArticleController();
