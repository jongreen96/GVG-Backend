const orderQueries = require('../queries/orders');

module.exports = (app) => {
	// ----------------- GET ----------------- //
	// Get all orders by userId
	app.get('/orders', async (req, res) => {
		try {
			const result = await orderQueries.getAllOrdersByUserId(req.user.id);
			res.send(result);
		} catch (err) {
			res.status(204).send({ message: err.message });
		}
	});

	// Get order by orderId
	app.get('/orders/:orderid', async (req, res) => {
		try {
			const result = await orderQueries.getOrderById(req.params.orderid);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});

	app.post('/orders/downloaded', async (req, res) => {
		try {
			const result = await orderQueries.updateDownloaded(
				req.body.id,
				req.body.productId
			);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});
};
