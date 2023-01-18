const orderQueries = require('../queries/orders');

module.exports = (app) => {
	// ----------------- GET ----------------- //
	// Get all orders by userId
	app.get('/orders/:id', async (req, res) => {
		try {
			const result = await orderQueries.getAllOrdersByUserId(req.params.id);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Orders not found' });
		}
	});

	// Get order by orderId
	app.get('/orders/:id', async (req, res) => {
		try {
			const result = await orderQueries.getOrderById(req.params.id);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Order not found' });
		}
	});
};
