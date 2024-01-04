export const findAllArticles = `
      SELECT 
        p.id AS id,
        p.title AS title,
        p.description AS description,
        pic.img AS img
      FROM 
        projects p
      JOIN 
        pictures pic ON p.picture_id = pic.id;
    `;

export const expiresIn = {
  access: '10s',
  refresh: '10m',
};
