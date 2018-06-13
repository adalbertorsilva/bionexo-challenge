module.exports = {
  development: {
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: 'bionexo_development',
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: 'bionexo_test',
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: 'bionexo_production',
    host: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
