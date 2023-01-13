const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
	// Serialize user
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// Deserialize user
	passport.deserializeUser(async (id, done) => {
		const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
		done(null, user.rows[0]);
	});

	// Local strategy
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			async (email, password, done) => {
				const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
				if (!user.rows[0]) {
					return done(null, false, { message: 'Email not registered' });
				}
				const validPassword = await bcrypt.compare(password, user.rows[0].password);
				if (!validPassword) {
					return done(null, false, { message: 'Incorrect password' });
				}
				return done(null, user.rows[0]);
			}
		)
	);

	// Initialize passport
	app.use(passport.initialize());
	app.use(passport.session());
};
