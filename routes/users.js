const userQuery = require('../queries/users');

module.exports = (app, passport) => {
	// ------------------- GET ------------------- //
	// Get user by id
	app.get('/users/:id', async (req, res) => {
		const result = await userQuery.getUserById(req.params.id);
		if (!result) res.status(404).send({ message: 'User not found' });
		res.send(result);
	});

	// Get user by email
	app.get('/users/email/:email', async (req, res) => {
		const result = await userQuery.getUserByEmail(req.params.email);
		if (!result) res.status(404).send({ message: 'User not found' });
		res.send(result);
	});

	// get user by username
	app.get('/users/username/:username', async (req, res) => {
		const result = await userQuery.getUserByUsername(req.params.username);
		if (!result) res.status(404).send({ message: 'User not found' });
		res.send(result);
	});

	// ------------------- POST ------------------- //
	// Create new user
	app.post('/users', async (req, res) => {
		try {
			const result = await userQuery.createUser(req.body);
			res.send(result);
		} catch (error) {
			console.log(error);
			res.status(400).send({ message: 'User not created' });
		}
	});

	// ------------------- PUT ------------------- //
	// Update user
	app.put('/users/:id', async (req, res) => {
		try {
			const result = await userQuery.updateUser(req.params.id, req.body);
			res.send(result);
		} catch (error) {
			console.log(error);
			res.status(400).send({ message: 'User not updated' });
		}
	});

	// ------------------- DELETE ------------------- //
	// Delete user
	app.delete('/users/:id', async (req, res) => {
		try {
			const result = await userQuery.deleteUser(req.params.id);
			res.send({ message: 'User deleted' });
		} catch (error) {
			res.status(400).send({ message: 'User not deleted' });
		}
	});
};
