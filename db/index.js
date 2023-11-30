const { Pool } = require('pg');
const { DB } = require('../config');

const pool = new Pool({
	// user: DB.PGUSER,
	// host: DB.PGHOST,
	// database: DB.PGDATABASE,
	// password: DB.PGPASSWORD,
	// port: DB.PGPORT,
	connectionString: DB.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = {
	query: async (text, params) => {
		const res = await pool.query(text, params);
		return res;
	},
	pool,
};
