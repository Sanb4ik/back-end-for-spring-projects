import { ARTICLES_DATA } from '../constants/index.js';

class ArticlesService {
  find() {
    return ARTICLES_DATA;
  }

  search(input) {
    return ARTICLES_DATA.filter((item) => {
      return (
        item.description.toLowerCase().includes(input.toLowerCase()) ||
        item.title.toLowerCase().includes(input.toLowerCase())
      );
    });
  }
}

export default new ArticlesService();
