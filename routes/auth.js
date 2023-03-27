const authQuery = require('../queries/auth');
const passport = require('passport');
const { format } = require('../loaders/middleware');
const { json } = require('express');

module.exports = (app) => {
	// ------------------- GET ------------------- //
	app.get('/auth', (req, res) => {
		if (req.user) {
			res.status(200).send({
				user: {
					email: req.user.email,
					username: req.user.username,
					first_name: req.user.first_name,
					last_name: req.user.last_name,
					address: req.user.address,
				},
			});
		} else {
			res.status(204).send({ message: 'User not logged in' });
		}
	});

	// ------------------- POST ------------------- //
	// Register new user
	app.post('/register', format, async (req, res) => {
		try {
			const result = await authQuery.register(req.body);
			res.status(200).send(result);
		} catch (err) {
			err.column ? res.status(400).send({ message: `Missing input: ${err.column}` }) : res.status(400).send({ message: 'User not registered' });
		}
	});

	// Login user
	app.post('/login', passport.authenticate('local'), async (req, res) => {
		res.status(200).json({
			user: {
				email: req.user.email,
				username: req.user.username,
				first_name: req.user.first_name,
				last_name: req.user.last_name,
				address: req.user.address,
			},
		});
	});

	// Logout user
	app.post('/logout', (req, res) => {
		req.logout((err) => {
			if (err) {
				console.log(err);
				return res.status(500).send({ error: 'Internal server error' });
			}
			res.status(200).redirect('/');
		});
	});
};
