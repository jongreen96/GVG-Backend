const cors = require('cors');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { SESSION_SECRET } = require('../config');

module.exports = (app) => {
	app.use(
		cors({
			origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
			credentials: true,
		})
	);
	app.use(
		express.json({
			limit: '5mb',
			verify: (req, res, buf) => {
				req.rawBody = buf.toString();
			},
		})
	);
	app.use(express.static('public'));
	app.use(express.urlencoded({ extended: true }));
	app.use(
		session({
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			store: new pgSession({
				pool: require('../db'),
				tableName: 'session',
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7,
				secure: 'auto',
				sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			},
			proxy: true,
		})
	);
	return app;
};
