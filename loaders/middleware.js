module.exports = {
	// Checks if the user logged in is the same as the user being requested
	isAuthorized: (req, res, next) => {
		if (req.user?.id == req.params.id) {
			next();
		} else {
			res.status(401).send({ message: 'Unauthorized' });
		}
	},
	// formats user input to lowercase
	format: (req, res, next) => {
		if (req.body.email) req.body.email = req.body.email.toLowerCase();
		if (req.body.username) req.body.username = req.body.username.toLowerCase();
		if (req.body.address) req.body.address = req.body.address.toLowerCase();
		next();
	},
};
