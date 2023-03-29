const orderQueries = require('../queries/orders');

module.exports = (app) => {
	// ----------------- GET ----------------- //
	// Get all orders by userId
	app.get('/orders', async (req, res) => {
		try {
			console.log('here');
			const result = await orderQueries.getAllOrdersByUserId(req.user.id);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});

	// Get order by orderId
	app.get('/orders/:orderid', async (req, res) => {
		try {
			const result = await orderQueries.getOrderById(req.user.orderid);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: err.message });
		}
	});
};
