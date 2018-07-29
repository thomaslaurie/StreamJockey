const pgp = require('pg-promise')({
    // initialization options here: http://vitaly-t.github.io/pg-promise/module-pg-promise.html
});


const config = {
    // https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object
    // TODO create new db user with restricted capabilities
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'test',
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'pgPassword',
}
  
const db = pgp(config);

// create a single db object for entire app
module.exports = db;