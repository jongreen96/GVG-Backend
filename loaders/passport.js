const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../db');

module.exports = (app) => {
	// Initialize passport
	app.use(passport.initialize());
	app.use(passport.session());

	// Set method to serialize data to store in cookie
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// Set method to deserialize data stored in cookie and attach to req.user
	passport.deserializeUser((id, done) => {
		done(null, { id });
	});

	// Configure local strategy to be use for local login
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			try {
				const user = await db.query(
					'SELECT * FROM users WHERE email = $1',
					[username]
				);
				if (user.rows.length === 0) {
					return done(null, false, {
						message: 'Incorrect username.',
					});
				}
				const validPassword = await bcrypt.compare(
					password,
					user.rows[0].password
				);
				if (!validPassword) {
					return done(null, false, {
						message: 'Incorrect password.',
					});
				}
				return done(null, user.rows[0]);
			} catch (err) {
				return done(err);
			}
		})
	);
};
