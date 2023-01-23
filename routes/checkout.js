const checkoutQueries = require('../queries/checkout');

module.exports = (app) => {
	// --------------------- POST --------------------- //
	app.post('/carts/:id/checkout', async (req, res) => {
		try {
			const result = await checkoutQueries.createOrder(req.params.id, req.body);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});
};
