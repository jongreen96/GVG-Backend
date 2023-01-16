const express = require('express');
const routes = express.Router();

module.exports = (app) => {
	// Home page
	app.get('/', (req, res) => {
		req.session.viewCount ? req.session.viewCount++ : (req.session.viewCount = 1);
		res.send(
			`<h1>Express e-commerce API - Jon Green.</h1>
			<h2>View count: ${req.session.viewCount}</h2>
			<h2>User: ${req.user ? `${req.user.first_name} ${req.user.last_name}` : 'Not logged in'}</h2>`
		);
	});

	// Auth routes
	const auth = require('./auth');
	auth(app);

	// User routes
	const users = require('./users');
	users(app);

	// Product routes
	const products = require('./products');
	products(app);

	// Order routes
	// const orders = require('./orders');
	// orders(app);

	// Cart routes
	const carts = require('./carts');
	carts(app);

	// Review routes
	// const reviews = require('./reviews');
	// reviews(app);
};
