const express = require('express');
const routes = express.Router();

module.exports = (app, passport) => {
	app.get('/', (req, res) => {
		res.send('Express e-commerce API - Jon Green');
	});
};
