const authQuery = require('../queries/auth');
const passport = require('passport');

module.exports = (app) => {
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
	app.post('/login', passport.authenticate('local'), async (req, res) => {
		res.send(req.user);
	});

	// Logout user
	app.get('/logout', (req, res) => {
		req.logout((err) => {
			if (err) {
				res.status(400).send({ message: 'User not logged out' });
			}
		});
		res.send({ message: 'User logged out' });
	});
};
