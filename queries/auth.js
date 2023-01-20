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
		return {
			email: newUser.rows[0].email,
			username: newUser.rows[0].username,
			firstName: newUser.rows[0].first_name,
			lastName: newUser.rows[0].last_name,
			address: newUser.rows[0].address,
		};
	},
};
