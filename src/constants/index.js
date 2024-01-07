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

export const token = {
  access: {
    secret: 'access_secret',
    expiresIn: '10s',
  },
  refresh: {
    secret: 'refresh_secret',
    expiresIn: '10d',
  },
};
