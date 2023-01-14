const db = require('../db');
const bcrypt = require('bcryptjs');

module.exports = {
	register: async (user) => {
		if (user.password) user.password = await bcrypt.hash(user.password, 10);
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
	login: async (email, password) => {
		const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
		if (!user.rows[0]) return { error: 'User not found' };
		const match = await bcrypt.compare(password, user.rows[0].password);
		if (!match) return { error: 'Incorrect password' };
		return user.rows[0];
	},
};
