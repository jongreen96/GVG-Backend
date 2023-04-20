const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { SESSION_SECRET } = require('../config');

module.exports = (app) => {
	app.use(morgan('dev'));
	app.use(
		cors({
			origin: [process.env.CLIENT_URL, 'http://localhost:5173'],
			credentials: true,
			exposedHeaders: ['set-cookie'],
		})
	);
	app.use(express.json());
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
				maxAge: 1000 * 60 * 60 * 24,
				secure: true,
				sameSite: 'none',
			},
		})
	);
	return app;
};
