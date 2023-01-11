const db = require('../db');

module.exports = {
	getUserById: async (id) => {
		const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
		return user.rows[0];
	},
	getUserByEmail: async (email) => {
		const user = await db.query('SELECT * FROM users WHERE email = $1', [
			email,
		]);
		return user.rows[0];
	},
	getUserByUsername: async (username) => {
		const user = await db.query('SELECT * FROM users WHERE username = $1', [
			username,
		]);
		return user.rows[0];
	},
	createUser: async (user) => {
		const newUser = await db.query(
			'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
			[user.email, user.password, user.first_name, user.last_name]
		);
		return newUser.rows[0];
	},
};
