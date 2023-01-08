require('dotenv').config();
const express = require('express'),
	app = express(),
	port = process.env.PORT;

app.get('/', (req, res) => {
	res.send('E-commerce REST API ');
});

app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});
