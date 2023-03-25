const db = require('../db');
const bcrypt = require('bcryptjs');

module.exports = {
	register: async (user) => {
		if (user.password) user.password = await bcrypt.hash(user.password, 10);
		const newUser = await db.query(
			`INSERT INTO users (email, password, username, first_name, last_name, address) 
			 VALUES ($1, $2, $3, $4, $5, $6) RETURNING email, username, first_name, last_name, address`,
			[user.email, user.password, user.username, user.firstName, user.lastName, user.address]
		);
		return newUser.rows[0];
	},
};
