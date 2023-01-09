const { Pool } = require('pg');
const { DB } = require('../config');

const pool = new Pool({
	user: DB.PGUSER,
	host: DB.PGHOST,
	database: DB.PGDATABASE,
	password: DB.PGPASSWORD,
	port: DB.PGPORT,
});

module.exports = {
	query: async (text, params) => {
		const start = Date.now();
		const res = await pool.query(text, params);
		const duration = Date.now() - start;
		console.log('Executed query >', { text, duration, rows: res.rowCount });
		return res;
	},
};
