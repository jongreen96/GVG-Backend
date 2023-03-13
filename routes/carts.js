const { isAuthorized } = require('../loaders/middleware');
const cartQueries = require('../queries/carts');

module.exports = (app) => {
	// ------------------- GET ------------------- //
	// Get cart by user id
	app.get('/carts', async (req, res) => {
		try {
			const result = await cartQueries.getCartByUserId(req.user.id);
			res.send(result);
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	});

	// ------------------- POST ------------------- //
	// Add item to cart
	app.post('/carts', async (req, res) => {
		try {
			const result = await cartQueries.addItemToCart(req.user.id, req.body);
			res.send(result);
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	});

	// ------------------- PUT ------------------- //
	// Update item in cart
	app.put('/carts', async (req, res) => {
		try {
			const result = await cartQueries.updateItemInCart(req.user.id, req.body);
			res.send(result);
		} catch (err) {
			res.status(500).send({ message: err.message });
		}
	});

	// ------------------- DELETE ------------------- //
	// Remove item from cart
	app.delete('/carts', async (req, res) => {
		try {
			const result = await cartQueries.removeItemFromCart(req.user.id, req.body);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: 'Item not removed from cart' });
		}
	});

	// Remove all items from cart
	app.delete('/carts/all', async (req, res) => {
		try {
			const result = await cartQueries.removeAllItemsFromCart(req.user.id);
			res.send(result);
		} catch (err) {
			res.status(400).send({ message: 'Items not removed from cart' });
		}
	});
};
