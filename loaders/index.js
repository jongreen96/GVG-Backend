const expressMiddleware = require('./express');
const passportMiddleware = require('./passport');
const routes = require('../routes');

module.exports = (app) => {
	// Load express middleware
	const express = expressMiddleware(app);

	// Load passport middleware
	const passport = passportMiddleware(express);

	// Load API route handlers
	routes(app, passport);
};
