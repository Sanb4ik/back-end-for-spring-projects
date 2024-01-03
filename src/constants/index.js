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
export const ARTICLES_DATA = [
  {
    title: 'Spring Boot',
    description:
      'Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.',
    img: 'spring-boot',
  },
  {
    title: 'Spring Framework',
    description:
      'Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.',
    img: 'spring-framework',
  },
  {
    title: 'Spring Data',
    description:
      'Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.',
    img: 'spring-data',
  },
  {
    title: 'Spring Cloud',
    description:
      ' Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.',
    img: 'spring-cloud',
  },
  {
    title: 'Spring Cloud Data Flow',
    description:
      'Provides an orchestration service for composable data microservice applications on modern runtimes.',
    img: 'spring-data-flow',
  },
  {
    title: 'Spring Security',
    description:
      'Protects your application with comprehensive and extensible authentication and authorization support.',
    img: 'spring-security',
  },
];
