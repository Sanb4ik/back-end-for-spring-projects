import { db } from '../config/db_connection.js';
import { findAllArticles } from '../constants/index.js';

class ArticlesService {
  async find() {
    return db.any(findAllArticles);
  }

  async search(input) {
    const articles = await db.any(findAllArticles);
    return articles.filter(
      (item) =>
        item.description.toLowerCase().includes(input.toLowerCase()) ||
        item.title.toLowerCase().includes(input.toLowerCase()),
    );
  }
}

export default new ArticlesService();
