import PGP from 'pg-promise';

const pgp = PGP({
	//TODO Initialization options go here.
	//L http://vitaly-t.github.io/pg-promise/module-pg-promise.html
});

const database = pgp({
	//L https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object
	//TODO Create new database user with restricted capabilities.
	host:     process.env.DB_HOST     ?? 'localhost',
	port:     process.env.DB_PORT     ?? '5432',
	database: process.env.DB_NAME     ?? 'test',
	user:     process.env.DB_USERNAME ?? 'postgres',
	password: process.env.DB_PASSWORD ?? 'pgPassword',
});

// Create a single database object for entire app.
export default database;
export {pgp};
