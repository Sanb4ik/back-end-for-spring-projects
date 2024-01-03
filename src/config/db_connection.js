import pgPromise from 'pg-promise';

const pgp = pgPromise();

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'spring-projects',
  user: 'postgres',
  password: 'master',
};

export const db = pgp(connection);
