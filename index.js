require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { SESSION_SECRET } = require('./config');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			maxAge: 24 * 60 * 60 * 1000,
		},
	})
);

// Directs all requests to main routes logic
const routes = require('./routes');
app.use('/', routes);

app.listen(port, () => {
	console.log(`Server listening on port: http://localhost:${port}`);
});
