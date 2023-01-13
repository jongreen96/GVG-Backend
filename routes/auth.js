const authQuery = require('../queries/auth');
const passportMiddleware = require('passport');

module.exports = (app, passport) => {
	// ------------------- POST ------------------- //
	// Register new user
	app.post('/register', async (req, res) => {
		try {
			const result = await authQuery.register(req.body);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'User not registered' });
		}
	});

	// Login user
	app.post('/login', passportMiddleware.authenticate('local'), async (req, res) => {
		res.send(req.user);
	});

	// Logout user
	app.get('/logout', (req, res) => {
		req.logout();
		res.send({ message: 'User logged out' });
	});
};
