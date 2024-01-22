import { db } from '../config/db_connection.js';
import { findAllArticles } from '../constants/index.js';

class ArticlesService {
  async find() {
    const response = await db.any(findAllArticles);
    let articlesMap = [];
    for (let i = 0; i < response.length; i++) {
      let images = [];
      for (let j = 0; j < response[i].img.length; j++) {
        const img = {
          img: images,
        };
      }
      const article = {
        id: response[i].id,
        title: response[i].title,
        description: response[i].description,
        img: { img: response[i].img },
      };
      articlesMap.push(article);
    }

    return response;
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
