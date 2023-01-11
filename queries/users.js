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
			`INSERT INTO users (email, password, username, first_name, last_name, address) 
			 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[
				user.email,
				user.password,
				user.username,
				user.first_name,
				user.last_name,
				user.address,
			]
		);
		return newUser.rows[0];
	},
};
