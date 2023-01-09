require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

// Directs all requests to main routes logic
const routes = require('./routes');
app.use('/', routes);

app.listen(port, () => {
	console.log(`Server listening on port: http://localhost:${port}`);
});
