const userQuery = require('../queries/users');
const { isAuthorized } = require('../loaders/middleware');

module.exports = (app) => {
	// ------------------- GET ------------------- //
	// Get user by id
	app.get('/users/:id', async (req, res) => {
		try {
			const result = await userQuery.getUserById(req);
			return res.send(result);
		} catch (err) {
			res.status(404).send({ message: err.message });
		}
	});

	// ------------------- PUT ------------------- //
	// Update user by id
	app.put('/users/:id', isAuthorized, async (req, res) => {
		try {
			const result = await userQuery.updateUser(req);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: 'User not updated' });
		}
	});

	// ------------------- DELETE ------------------- //
	// Delete user
	app.delete('/users/:id', isAuthorized, async (req, res) => {
		try {
			const result = await userQuery.deleteUser(req.params.id);
			req.logout((err) => {
				if (err) {
					res.status(400).send({ message: 'User not logged out' });
				}
			});
			res.send({ message: 'User deleted' });
		} catch (error) {
			res.status(400).send({ message: 'User not deleted' });
		}
	});
};
