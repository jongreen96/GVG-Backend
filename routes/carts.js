const { isAuthorized } = require('../loaders/middleware');
const cartQueries = require('../queries/carts');

module.exports = (app) => {
	// ------------------- GET ------------------- //
	// Get cart by user id
	app.get('/carts/:id', isAuthorized, async (req, res) => {
		try {
			const result = await cartQueries.getCartByUserId(req.params.id);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Cart not found' });
		}
	});

	// ------------------- POST ------------------- //
	// Add item to cart
	app.post('/carts/:id', isAuthorized, async (req, res) => {
		try {
			const result = await cartQueries.addItemToCart(req.params.id, req.body);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Item not added to cart' });
		}
	});

	// ------------------- PUT ------------------- //
	// Update item in cart
	app.put('/carts/:id', isAuthorized, async (req, res) => {
		try {
			const result = await cartQueries.updateItemInCart(req.params.id, req.body);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Item not updated in cart' });
		}
	});

	// ------------------- DELETE ------------------- //
	// Remove item from cart
	app.delete('/carts/:id', isAuthorized, async (req, res) => {
		try {
			const result = await cartQueries.removeItemFromCart(req.params.id, req.body);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Item not removed from cart' });
		}
	});
};
