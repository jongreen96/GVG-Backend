// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config();
// }

const app = require('express')();
const port = process.env.PORT;

// Loaders
const loaders = require('./loaders');
loaders(app);

app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});
