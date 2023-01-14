module.exports = {
	isAuthorized: (req, res, next) => {
		if (req.user?.id == req.params.id) {
			next();
		} else {
			res.status(401).send({ message: 'Unauthorized' });
		}
	},
	format: (req, res, next) => {
		if (req.body.email) req.body.email = req.body.email.toLowerCase();
		if (req.body.username) req.body.username = req.body.username.toLowerCase();
		if (req.body.address) req.body.address = req.body.address.toLowerCase();
		next();
	},
};
