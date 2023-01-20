const authQuery = require('../queries/auth');
const passport = require('passport');
const { format } = require('../loaders/middleware');

module.exports = (app) => {
	// ------------------- POST ------------------- //
	// Register new user
	app.post('/register', format, async (req, res) => {
		try {
			const result = await authQuery.register(req.body);
			res.send(result);
		} catch (err) {
			err.column
				? res.status(400).send({ message: `Missing input: ${err.column}` })
				: res.status(400).send({ message: 'User not registered' });
		}
	});

	// Login user
	app.post('/login', passport.authenticate('local'), async (req, res) => {
		res.status(200).redirect('/');
	});

	// Logout user
	app.post('/logout', (req, res) => {
		req.logout((err) => {
			if (err) {
				res.status(400).send({ message: 'User not logged out' });
			}
		});
		res.status(200).redirect('/');
	});
};
