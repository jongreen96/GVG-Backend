const db = require('../db');
const bcrypt = require('bcryptjs');

module.exports = {
	getUserById: async (req) => {
		const user = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
		if (!user.rows[0]) throw new Error('User not found');
		if (req.user.id === user.rows[0].id) {
			return {
				email: user.rows[0].email,
				username: user.rows[0].username,
				firstName: user.rows[0].first_name,
				lastName: user.rows[0].last_name,
				address: user.rows[0].address,
				created: user.rows[0].created,
			};
		} else {
			return {
				firstName: user.rows[0].first_name,
				lastName: user.rows[0].last_name,
				username: user.rows[0].username,
			};
		}
	},
	updateUser: async (req) => {
		const user = req.body;
		let queryStr = 'UPDATE users SET modified = NOW(),';
		const values = [];
		let i = 1;

		if (user.password) user.password = await bcrypt.hash(user.password, 10);

		for (const key in user) {
			if (user.hasOwnProperty(key)) {
				if (['id', 'otherProperties'].includes(key)) continue;
				if (user[key] === '') continue;
				queryStr += `${key} = $${i}, `;
				values.push(user[key]);
				i++;
			}
		}
		queryStr = queryStr.slice(0, -2);
		queryStr += ' WHERE id = $' + i + ' RETURNING email, username, first_name, last_name, address';
		values.push(req.user.id);
		const updatedUser = await db.query(queryStr, values);
		return updatedUser.rows[0];
	},
	deleteUser: async (id) => {
		const deletedUser = await db.query('DELETE FROM users WHERE id = $1', [id]);
		return deletedUser.rows[0];
	},
};
