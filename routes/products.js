const productQueries = require('../queries/products');

module.exports = (app) => {
	// ------------------- GET ------------------- //
	// Get all products
	app.get('/products', async (req, res) => {
		try {
			const result = await productQueries.getAll();
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Products not found' });
		}
	});

	// Get product by id
	app.get('/products/:id', async (req, res) => {
		try {
			const result = await productQueries.getById(req.params.id);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Product not found' });
		}
	});

	// ------------------- POST ------------------- //
	// Create new product
	app.post('/products', async (req, res) => {
		try {
			const result = await productQueries.create(req.body);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Product not created' });
		}
	});

	// ------------------- PUT ------------------- //
	// Update product
	app.put('/products/:id', async (req, res) => {
		try {
			const result = await productQueries.update(req.params.id, req.body);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Product not updated' });
		}
	});

	// ------------------- DELETE ------------------- //
	// Delete product
	app.delete('/products/:id', async (req, res) => {
		try {
			const result = await productQueries.delete(req.params.id);
			res.send(result);
		} catch (error) {
			res.status(400).send({ message: 'Product not deleted' });
		}
	});
};
