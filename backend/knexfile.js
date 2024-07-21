module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'admin',
        database: 'db_profile',
        port: 5432,
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: './database/development/migrations',
      },
      seeds: {
        directory: './database/development/seeds',
      },
      
    },

  };
  