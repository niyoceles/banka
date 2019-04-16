import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const env = (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') ? `_${process.env.NODE_ENV}` : '';

const config = {
  host: process.env[`DB_HOST${env}`],
  user: process.env[`DB_USER${env}`],
  database: process.env[`DB_NAME${env}`],
  password: process.env[`DB_PASSWORD${env}`],
  port: process.env[`DB_PORT${env}`],
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};