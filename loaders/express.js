const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { SESSION_SECRET } = require('../config');

module.exports = (app) => {
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(
		session({
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 1000 * 60 * 60 * 24,
				secure: false,
			},
		})
	);
	return app;
};
