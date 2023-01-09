const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
	res.send('E-commerce REST API ');
});

module.exports = routes;
