const express = require('express');
const routes = express.Router();

module.exports = (app, passport) => {
	app.get('/', (req, res) => {
		req.session.viewCount ? req.session.viewCount++ : (req.session.viewCount = 1);
		res.send(
			`<h1>Express e-commerce API - Jon Green.</h1>
			<h2>View count: ${req.session.viewCount}</h2>`
		);
	});

	// Auth routes
	const auth = require('./auth');
	auth(app, passport);

	// User routes
	const users = require('./users');
	users(app, passport);

	// Product routes
	// const products = require('./products');
	// products(app, passport);

	// Category routes
	// const categories = require('./categories');
	// categories(app, passport);

	// Order routes
	// const orders = require('./orders');
	// orders(app, passport);

	// Cart routes
	// const carts = require('./carts');
	// carts(app, passport);

	// Review routes
	// const reviews = require('./reviews');
	// reviews(app, passport);
};
