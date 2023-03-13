const checkoutQueries = require('../queries/checkout');

module.exports = (app) => {
	// --------------------- POST --------------------- //
	app.post('/carts/checkout', async (req, res) => {
		try {
			const result = await checkoutQueries.createOrder(req.user.id, req.body);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});
};
