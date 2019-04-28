import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connString = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: connString,
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

// const dropTables = () => {
//   const accountsTable = 'DROP TABLE IF EXISTS accounts';

//   const usersTable = 'DROP TABLE IF EXISTS users';

//   const transactionsTable = 'DROP TABLE IF EXISTS transactions';

//   const dropTablesQueries = ` ${transactionsTable}; ${accountsTable}; ${usersTable}`;

//   pool.query(dropTablesQueries)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
//   pool.on('remove', () => {
//     console.log('client removed');
//     process.exit(0);
//   });
// };

const createTables = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(50) NOT NULL,
        "lastName" VARCHAR(50) NOT NULL,
        "userName" VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(100) NULL,
        type VARCHAR(50) NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT FALSE,
        location VARCHAR(100) NULL,
        "createdDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`;

  const accountsTable = `CREATE TABLE IF NOT EXISTS
      accounts(
        id SERIAL NOT NULL,
        "accountNumber" BIGINT NOT NULL,
        owner INT NOT NULL REFERENCES users(id),
        type VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email VARCHAR(100) NULL,
        balance DECIMAL(12,2) NOT NULL,
        "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY("accountNumber")
      )`;

  const transactionsTable = `CREATE TABLE IF NOT EXISTS
      transactions(
        id SERIAL PRIMARY KEY,
        "createdOn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        type VARCHAR(50) NOT NULL,
        "accountNumber" BIGINT NOT NULL REFERENCES accounts("accountNumber"),
        cashier INT NOT NULL REFERENCES users(id),
        amount DECIMAL(12,2) NOT NULL,
        "oldBalance" DECIMAL(12,2) NOT NULL,
        "newBalance" DECIMAL(12,2) NOT NULL,
        reason TEXT NULL
      )`;

  const createTablesQueries = `${usersTable}; ${accountsTable}; ${transactionsTable}`;

  pool.query(createTablesQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

export { createTables, pool };

require('make-runnable');
